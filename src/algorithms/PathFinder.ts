import { NodeData, GridPosition } from '../type/NodeData';
import {
    sleep,
    isPositionUnVisted,
    createNewPositionBasedOnDirection,
    isValidPosition,
    isNotWallNode,
} from '../utils';
import {
    ALGORITHM_GRID_UPDATE_TIMEOUT,
    WALL_VALUE,
    MAX_COST_VALUE,
    NEIGHBORS_DIRECTION,
} from '../constants/algorithms';
import { UpdateGridUIBooleanValue } from '../type/Function';
import { PathFinderBuilder } from './PathFinderBuilder';
import { CostFindingStrategyBuilder } from './costFindingStrategies';
import { isEqual } from 'lodash';

export class PathFinder {
    private algorithmType: string;
    private rows: number;
    private cols: number;
    private grid: number[][];
    private cost: number[][];
    private updateGridUIIsVisted: UpdateGridUIBooleanValue;
    private updateGridUIIsPath: UpdateGridUIBooleanValue;
    private startPosition: GridPosition;
    private endPosition: GridPosition;

    public constructor(pathFinderBuilder: PathFinderBuilder) {
        this.algorithmType = pathFinderBuilder.algorithmType;
        this.rows = pathFinderBuilder.rows;
        this.cols = pathFinderBuilder.cols;
        this.updateGridUIIsPath = pathFinderBuilder.updateGridUIIsPath;
        this.updateGridUIIsVisted = pathFinderBuilder.updateGridUIIsVisted;
        this.grid = Array.from(Array(this.rows), () =>
            Array(this.cols).fill(0),
        );
        this.cost = Array.from(Array(this.rows), () =>
            Array(this.cols).fill(MAX_COST_VALUE),
        );
        this.startPosition = pathFinderBuilder.startPosition;
        this.endPosition = pathFinderBuilder.endPosition;
        this.fillGridWithNodesData(pathFinderBuilder.nodes);
    }

    private fillGridWithNodesData = (nodes: NodeData[]) => {
        nodes.forEach((node): void => {
            this.grid[node.rowIndex][node.colIndex] = node.isWall
                ? WALL_VALUE
                : node.weight;
        });
    };

    public visualizePathFindingProcess = async (): Promise<void> => {
        const costFindingStrategy = new CostFindingStrategyBuilder()
            .setGrid(this.grid)
            .setCost(this.cost)
            .setStartPosition(this.startPosition)
            .setEndPosition(this.endPosition)
            .setUpdateGridUIIsVisted(this.updateGridUIIsVisted)
            .build(this.algorithmType);
        await costFindingStrategy.findMinCost();
        if (!isPositionUnVisted(this.endPosition, this.cost)) {
            await this.visualizePath();
        }
    };

    private visualizePath = async (): Promise<void> => {
        const path = this.constructPath();
        for (const { rowIndex, colIndex } of path) {
            this.updateGridUIIsPath(rowIndex, colIndex, true);
            await sleep(ALGORITHM_GRID_UPDATE_TIMEOUT);
        }
    };

    private constructPath = (): GridPosition[] => {
        const reversedPath: GridPosition[] = [];
        let currentPosition = this.endPosition;
        while (!isEqual(currentPosition, this.startPosition)) {
            reversedPath.push(currentPosition);
            for (const previousDirection of NEIGHBORS_DIRECTION) {
                const previousPosition = createNewPositionBasedOnDirection(
                    currentPosition,
                    previousDirection,
                );
                if (
                    this.isCurrentPositionOriginateFromPreviousPosition(
                        previousPosition,
                        currentPosition,
                    )
                ) {
                    currentPosition = previousPosition;
                    break;
                }
            }
        }
        reversedPath.push(this.startPosition);
        return reversedPath.reverse();
    };

    private isCurrentPositionOriginateFromPreviousPosition = (
        previousPosition: GridPosition,
        currentPosition: GridPosition,
    ): boolean => {
        return (
            isValidPosition(previousPosition, this.grid) &&
            isNotWallNode(previousPosition, this.grid) &&
            this.getCostFromStartOfPosition(previousPosition) +
                this.getCostToEnterPosition(currentPosition) ===
                this.getCostFromStartOfPosition(currentPosition)
        );
    };

    private getCostFromStartOfPosition = ({
        rowIndex,
        colIndex,
    }: GridPosition): number => {
        return this.cost[rowIndex][colIndex];
    };

    private getCostToEnterPosition = ({
        rowIndex,
        colIndex,
    }: GridPosition): number => {
        return this.grid[rowIndex][colIndex];
    };
}
