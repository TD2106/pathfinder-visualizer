import { CostFindingStrategy } from './Strategy';
import { GridPosition } from '../../type/NodeData';
import { UpdateGridUIBooleanValue } from '../../type/Function';
import { CostFindingStrategyBuilder } from './StrategyBuilder';
import TinyQueue from 'tinyqueue';
import { AStarQueueNode, aStarQueueNodeComparator } from './types';
import {
    isPositionUnVisted,
    isAbleToEnterPosition,
    createNewPositionBasedOnDirection,
} from '../../utils';
import { NEIGHBORS_DIRECTION } from '../../constants/algorithms';
import { isEqual } from 'lodash';

export class AStarStrategy implements CostFindingStrategy {
    grid: number[][];
    cost: number[][];
    startPosition: GridPosition;
    endPosition: GridPosition;
    updateGridUIIsVisited: UpdateGridUIBooleanValue;
    queue: TinyQueue<AStarQueueNode>;

    public constructor(costFindingStrategyBuilder: CostFindingStrategyBuilder) {
        this.grid = costFindingStrategyBuilder.grid;
        this.cost = costFindingStrategyBuilder.cost;
        this.startPosition = costFindingStrategyBuilder.startPosition;
        this.endPosition = costFindingStrategyBuilder.endPosition;
        this.updateGridUIIsVisited =
            costFindingStrategyBuilder.updateGridUIIsVisited;
        this.queue = new TinyQueue<AStarQueueNode>(
            undefined,
            aStarQueueNodeComparator,
        );
    }

    public findMinCost = async (): Promise<void> => {
        this.queue.push(this.createNewAStarQueueNode(this.startPosition, 0));
        while (this.queue.length > 0) {
            const {
                position,
                costFromStartPosition,
            } = this.queue.pop() as AStarQueueNode;
            if (!isPositionUnVisted(position, this.cost)) {
                continue;
            }
            await this.updateGridUIIsVisited(
                position.rowIndex,
                position.colIndex,
                true,
            );
            this.setCostForPosition(position, costFromStartPosition);
            if (isEqual(position, this.endPosition)) {
                return;
            }
            NEIGHBORS_DIRECTION.forEach((nextDirection): void =>
                this.handleNewDirection(
                    position,
                    nextDirection,
                    costFromStartPosition,
                ),
            );
        }
    };

    private handleNewDirection = (
        currentPosition: GridPosition,
        newDirection: number[],
        currentCost: number,
    ): void => {
        const newPosition = createNewPositionBasedOnDirection(
            currentPosition,
            newDirection,
        );
        if (isAbleToEnterPosition(newPosition, this.grid, this.cost)) {
            this.queue.push(
                this.createNewAStarQueueNode(newPosition, currentCost),
            );
        }
    };

    private setCostForPosition = (
        { rowIndex, colIndex }: GridPosition,
        costFromStartPosition: number,
    ): void => {
        this.cost[rowIndex][colIndex] = costFromStartPosition;
    };

    private createNewAStarQueueNode = (
        newPosition: GridPosition,
        lastCost: number,
    ): AStarQueueNode => {
        return {
            position: newPosition,
            costFromStartPosition: lastCost + 1,
            estimatedCostToEndPosition: this.calculateHeuristicCostToEndPosition(
                newPosition,
                lastCost,
            ),
        };
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
}
