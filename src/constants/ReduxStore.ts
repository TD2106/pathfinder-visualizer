import { BFS } from './algorithms';
import { ReduxStore, GridConfig } from '../type/ReduxStore';

export const INITIAL_ALGORITHM_TYPE = BFS;
export const INITIAL_NODES = [];
export const INITIAL_GRID_CONFIG: GridConfig = {
    rows: 20,
    cols: 20,
};
export const INITIAL_REDUX_STORE_STATE: ReduxStore = {
    algorithmType: INITIAL_ALGORITHM_TYPE,
    gridConfig: INITIAL_GRID_CONFIG,
    nodes: INITIAL_NODES,
};
