import { CostFindingStrategy } from './Strategy';
import { GridPosition } from '../../type/NodeData';
import { UpdateGridUIBooleanValue } from '../../type/Function';
import { CostFindingStrategyBuilder } from './StrategyBuilder';
import { Deque } from '@blakeembrey/deque';
import { QueueNode } from './types';
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

export class BfsStrategy implements CostFindingStrategy {
    grid: number[][];
    cost: number[][];
    startPosition: GridPosition;
    endPosition: GridPosition;
    updateGridUIIsVisited: UpdateGridUIBooleanValue;
    queue: Deque<QueueNode>;

    public constructor(costFindingStrategyBuilder: CostFindingStrategyBuilder) {
        this.grid = costFindingStrategyBuilder.grid;
        this.cost = costFindingStrategyBuilder.cost;
        this.startPosition = costFindingStrategyBuilder.startPosition;
        this.endPosition = costFindingStrategyBuilder.endPosition;
        this.updateGridUIIsVisited =
            costFindingStrategyBuilder.updateGridUIIsVisited;
        this.queue = new Deque<QueueNode>();
    }

    public findMinCost = async (): Promise<void> => {
        this.queue.push(this.createNewQueueNode(this.startPosition, -1));
        while (this.queue.size > 0) {
            const { position, costFromStartPosition } = this.queue.popLeft();
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
            costFromStartPosition: lastCost + 1,
        };
    };
}
