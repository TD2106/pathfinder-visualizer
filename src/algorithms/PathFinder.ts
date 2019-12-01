import { NodeData, GridPosition } from '../type/NodeData';
import { WALL_VALUE, MAX_PATH_VALUE, NEIGHBORS_DIRECTION } from './constants';
import { Deque } from '@blakeembrey/deque';
import PriorityQueue from 'tinyqueue';
import {
    QueueNode,
    queueNodeComparator,
    AStarQueueNode,
    aStarQueueNodeComparator,
} from './types';
import { sleep } from '../utils';
import { ALGORITHM_GRID_UPDATE_TIMEOUT } from '../constants/algorithms';
import { UpdateGridUIBooleanValue } from '../type/Function';

export class PathFinder {
    private algorithmType: string;
    private rows: number;
    private cols: number;
    private grid: number[][];
    private path: number[][];
    private isPathExist: boolean = false;
    private updateGridUIIsVisted: UpdateGridUIBooleanValue;
    private updateGridUIIsPath: UpdateGridUIBooleanValue;
    private startPosition: GridPosition;
    private endPosition: GridPosition;

    public constructor(
        algorithmType: string,
        rows: number,
        cols: number,
        nodes: NodeData[],
        updateGridUIIsVisted: UpdateGridUIBooleanValue,
        updateGridUIIsPath: UpdateGridUIBooleanValue,
        startPosition: GridPosition,
        endPosition: GridPosition,
    ) {
        this.algorithmType = algorithmType;
        this.rows = rows;
        this.cols = cols;
        this.updateGridUIIsPath = updateGridUIIsPath;
        this.updateGridUIIsVisted = updateGridUIIsVisted;
        this.grid = Array.from(Array(rows), () => Array(cols).fill(0));
        this.path = Array.from(Array(rows), () =>
            Array(cols).fill(MAX_PATH_VALUE),
        );
        this.startPosition = startPosition;
        this.endPosition = endPosition;
        this.fillGridWithNodesData(nodes);
    }

    private fillGridWithNodesData = (nodes: NodeData[]) => {
        nodes.forEach((node): void => {
            this.grid[node.rowIndex][node.colIndex] = node.isWall
                ? WALL_VALUE
                : node.weight;
        });
    };

    private findMinPathBFS = async (): Promise<void> => {
        const queue = new Deque<QueueNode>();
        queue.push({ position: this.startPosition, costFromStartPosition: 0 });
        while (queue.size > 0) {
            const {
                position,
                costFromStartPosition: costFromStartPosition,
            } = queue.popLeft();
            if (!this.isPositionUnVisted(position)) {
                continue;
            }
            this.updateGridUIIsVisted(
                position.rowIndex,
                position.colIndex,
                true,
            );
            await sleep(ALGORITHM_GRID_UPDATE_TIMEOUT);
            this.path[position.rowIndex][
                position.colIndex
            ] = costFromStartPosition;
            NEIGHBORS_DIRECTION.forEach(
                ([rowDirection, colDirection]): void => {
                    const newPosition: GridPosition = {
                        rowIndex: position.rowIndex + rowDirection,
                        colIndex: position.colIndex + colDirection,
                    };
                    if (this.isAbleToEnterPosition(newPosition)) {
                        queue.push({
                            position: newPosition,
                            costFromStartPosition: costFromStartPosition + 1,
                        });
                    }
                },
            );
        }
    };

    private findMinPathDijkstra = async (): Promise<void> => {
        const priorityQueue = new PriorityQueue<QueueNode>(
            [],
            queueNodeComparator,
        );
        priorityQueue.push({
            position: this.startPosition,
            costFromStartPosition: 0,
        });
        while (priorityQueue.length > 0) {
            const {
                position,
                costFromStartPosition,
            } = priorityQueue.pop() as QueueNode;
            if (!this.isPositionUnVisted(position)) {
                continue;
            }
            this.updateGridUIIsVisted(
                position.rowIndex,
                position.colIndex,
                true,
            );
            await sleep(ALGORITHM_GRID_UPDATE_TIMEOUT);
            this.path[position.rowIndex][
                position.colIndex
            ] = costFromStartPosition;
            NEIGHBORS_DIRECTION.forEach(
                ([rowDirection, colDirection]): void => {
                    const newPosition: GridPosition = {
                        rowIndex: position.rowIndex + rowDirection,
                        colIndex: position.colIndex + colDirection,
                    };
                    if (this.isAbleToEnterPosition(newPosition)) {
                        priorityQueue.push({
                            position: newPosition,
                            costFromStartPosition:
                                costFromStartPosition +
                                this.grid[position.rowIndex][position.colIndex],
                        });
                    }
                },
            );
        }
    };

    private findMinPathAStar = async (): Promise<void> => {
        const priorityQueue = new PriorityQueue<AStarQueueNode>(
            [],
            aStarQueueNodeComparator,
        );
        priorityQueue.push({
            position: this.startPosition,
            costFromStartPosition: 0,
            estimatedCostToEndPosition: this.calculateHeuristicCostToEndPosition(
                this.startPosition,
                0,
            ),
        });
        while (priorityQueue.length > 0) {
            const {
                position,
                costFromStartPosition: currentCost,
            } = priorityQueue.pop() as QueueNode;
            if (!this.isPositionUnVisted(position)) {
                continue;
            }
            this.updateGridUIIsVisted(
                position.rowIndex,
                position.colIndex,
                true,
            );
            await sleep(ALGORITHM_GRID_UPDATE_TIMEOUT);
            this.path[position.rowIndex][position.colIndex] = currentCost;
            NEIGHBORS_DIRECTION.forEach(
                ([rowDirection, colDirection]): void => {
                    const newPosition: GridPosition = {
                        rowIndex: position.rowIndex + rowDirection,
                        colIndex: position.colIndex + colDirection,
                    };
                    if (this.isAbleToEnterPosition(newPosition)) {
                        priorityQueue.push({
                            position: newPosition,
                            costFromStartPosition: currentCost + 1,
                            estimatedCostToEndPosition: this.calculateHeuristicCostToEndPosition(
                                newPosition,
                                currentCost + 1,
                            ),
                        });
                    }
                },
            );
        }
    };

    private calculateHeuristicCostToEndPosition = (
        currentPosition: GridPosition,
        costFromStartPosition: number,
    ): number => {
        return (
            costFromStartPosition +
            Math.abs(this.endPosition.rowIndex - currentPosition.rowIndex) +
            Math.abs(this.endPosition.colIndex - currentPosition.colIndex)
        );
    };

    private isAbleToEnterPosition = (position: GridPosition): boolean => {
        return (
            this.isValidPosition(position) &&
            this.isNotWallNode(position) &&
            this.isPositionUnVisted(position)
        );
    };

    private isValidPosition = ({
        rowIndex,
        colIndex,
    }: GridPosition): boolean => {
        return (
            rowIndex >= 0 &&
            rowIndex < this.rows &&
            colIndex >= 0 &&
            colIndex < this.cols
        );
    };

    private isNotWallNode = ({ rowIndex, colIndex }: GridPosition): boolean => {
        return this.grid[rowIndex][colIndex] !== WALL_VALUE;
    };

    private isPositionUnVisted = ({
        rowIndex,
        colIndex,
    }: GridPosition): boolean => {
        return this.path[rowIndex][colIndex] !== MAX_PATH_VALUE;
    };
}
