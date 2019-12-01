export interface NodeData {
    weight: number;
    isWall: boolean;
    isVisited: boolean;
    isPath: boolean;
    rowIndex: number;
    colIndex: number;
}

export interface GridPosition {
    rowIndex: number;
    colIndex: number;
}
