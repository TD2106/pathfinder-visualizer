import { NodeData } from './NodeData';

export interface ReduxStore {
    algorithmType: string;
    gridConfig: GridConfig;
    nodes: NodeData[];
}

export interface GridConfig {
    rows: number;
    cols: number;
}
