import { CostFindingStrategy } from './Strategy';
import { GridPosition } from '../../type/NodeData';
import { UpdateGridUIBooleanValue } from '../../type/Function';
import { CostFindingStrategyBuilder } from './StrategyBuilder';
import TinyQueue from 'tinyqueue';
import { QueueNode, queueNodeComparator } from './types';
import {
    sleep,
    isPositionUnVisted,
    isAbleToEnterPosition,
    createNewPositionBasedOnDirection,
} from '../../utils';
import {
    ALGORITHM_GRID_UPDATE_TIMEOUT,
    NEIGHBORS_DIRECTION,
} from '../../constants/algorithms';
import { isEqual } from 'lodash';

export class DijkstraStrategy implements CostFindingStrategy {
    grid: number[][];
    cost: number[][];
    startPosition: GridPosition;
    endPosition: GridPosition;
    updateGridUIIsVisited: UpdateGridUIBooleanValue;
    queue: TinyQueue<QueueNode>;

    public constructor(costFindingStrategyBuilder: CostFindingStrategyBuilder) {
        this.grid = costFindingStrategyBuilder.grid;
        this.cost = costFindingStrategyBuilder.cost;
        this.startPosition = costFindingStrategyBuilder.startPosition;
        this.endPosition = costFindingStrategyBuilder.endPosition;
        this.updateGridUIIsVisited =
            costFindingStrategyBuilder.updateGridUIIsVisited;
        this.queue = new TinyQueue<QueueNode>(undefined, queueNodeComparator);
    }

    public findMinCost = async (): Promise<void> => {
        this.queue.push({
            position: this.startPosition,
            costFromStartPosition: 0,
        });
        while (this.queue.length > 0) {
            const {
                position,
                costFromStartPosition,
            } = this.queue.pop() as QueueNode;
            if (!isPositionUnVisted(position, this.cost)) {
                continue;
            }
            this.updateGridUIIsVisited(
                position.rowIndex,
                position.colIndex,
                true,
            );
            this.setCostForPosition(position, costFromStartPosition);
            if (isEqual(position, this.endPosition)) {
                return;
            }
            await sleep(ALGORITHM_GRID_UPDATE_TIMEOUT);
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
            this.queue.push(this.createNewQueueNode(newPosition, currentCost));
        }
    };

    private setCostForPosition = (
        { rowIndex, colIndex }: GridPosition,
        costFromStartPosition: number,
    ): void => {
        this.cost[rowIndex][colIndex] = costFromStartPosition;
    };

    private createNewQueueNode = (
        newPosition: GridPosition,
        lastCost: number,
    ): QueueNode => {
        return {
            position: newPosition,
            costFromStartPosition:
                lastCost + this.getCostToEnterPosition(newPosition),
        };
    };

    private getCostToEnterPosition = ({
        rowIndex,
        colIndex,
    }: GridPosition): number => {
        return this.grid[rowIndex][colIndex];
    };
}
