import { GridPosition } from '../../type/NodeData';
import { UpdateGridUIBooleanValue } from '../../type/Function';

export interface CostFindingStrategy {
    grid: number[][];
    cost: number[][];
    startPosition: GridPosition;
    endPosition: GridPosition;
    updateGridUIIsVisited: UpdateGridUIBooleanValue;
    findMinCost: () => Promise<void>;
}
