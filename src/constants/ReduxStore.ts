import { BFS } from './algorithms';
import { ReduxStore, GridConfig } from '../type/ReduxStore';

export const INITIAL_ALGORITHM_TYPE = BFS;
export const MIN_GRID_DIMENSION_SIZE = 10;
export const MAX_GRID_DIMENSION_SIZE = 50;
export const INITIAL_GRID_CONFIG: GridConfig = {
    rows: 20,
    cols: 20,
};
export const INITIAL_REDUX_STORE_STATE: ReduxStore = {
    algorithmType: INITIAL_ALGORITHM_TYPE,
    gridConfig: INITIAL_GRID_CONFIG,
};
