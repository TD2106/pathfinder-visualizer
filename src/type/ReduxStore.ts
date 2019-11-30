export interface ReduxStore {
    algorithmType: string;
    gridConfig: GridConfig;
}

export interface GridConfig {
    rows: number;
    cols: number;
}
