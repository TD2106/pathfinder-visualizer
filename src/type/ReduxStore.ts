import { NodeData, GridPosition } from './NodeData';

export interface ReduxStore {
    algorithmType: string;
    gridConfig: GridConfig;
    nodes: NodeData[];
    gridMarkedPosition: GridMarkedPosition;
    isDisabledInput: boolean;
}

export interface GridConfig {
    rows: number;
    cols: number;
}

export interface GridMarkedPosition {
    start: GridPosition;
    end: GridPosition;
}
