import { BFS } from './algorithms';
import { ReduxStore, GridConfig, GridMarkedPosition } from '../type/ReduxStore';
import { EMPTY_GRID_POSITION } from './grid';

export const INITIAL_ALGORITHM_TYPE = BFS;
export const INITIAL_NODES = [];
export const INITIAL_GRID_MARKED_POSITION: GridMarkedPosition = {
    start: EMPTY_GRID_POSITION,
    end: EMPTY_GRID_POSITION,
};
export const INITIAL_IS_DISABLED_INPUT = false;

export const INITIAL_GRID_CONFIG: GridConfig = {
    rows: 20,
    cols: 20,
};
export const INITIAL_REDUX_STORE_STATE: ReduxStore = {
    algorithmType: INITIAL_ALGORITHM_TYPE,
    gridConfig: INITIAL_GRID_CONFIG,
    nodes: INITIAL_NODES,
    gridMarkedPosition: INITIAL_GRID_MARKED_POSITION,
    isDisabledInput: INITIAL_IS_DISABLED_INPUT,
};
