import { GridPosition } from '../type/NodeData';

export interface QueueNode {
    position: GridPosition;
    costFromStartPosition: number;
}

export interface AStarQueueNode extends QueueNode {
    estimatedCostToEndPosition: number;
}

export const queueNodeComparator = (
    firstNode: QueueNode,
    secondNode: QueueNode,
): number => {
    return firstNode.costFromStartPosition - secondNode.costFromStartPosition;
};

export const aStarQueueNodeComparator = (
    firstNode: AStarQueueNode,
    secondNode: AStarQueueNode,
): number => {
    return (
        firstNode.estimatedCostToEndPosition -
        secondNode.estimatedCostToEndPosition
    );
};
