import { Reducer, AnyAction } from 'redux';
import { GridConfigActionTypes } from './types';
import {
    INITIAL_GRID_CONFIG,
    MIN_GRID_DIMENSION_SIZE,
    MAX_GRID_DIMENSION_SIZE,
} from '../../constants/ReduxStore';
import { GridConfig } from '../../type/ReduxStore';
import { getValueWithinRange } from '../../utils';

export const gridConfigReducer: Reducer<GridConfig> = (
    state: GridConfig = INITIAL_GRID_CONFIG,
    action: AnyAction,
): GridConfig => {
    switch (action.type) {
        case GridConfigActionTypes.UPDATE_GRID_CONFIG:
            return {
                rows: getValueWithinRange(
                    action.payload.rows,
                    MIN_GRID_DIMENSION_SIZE,
                    MAX_GRID_DIMENSION_SIZE,
                ),
                cols: getValueWithinRange(
                    action.payload.cols,
                    MIN_GRID_DIMENSION_SIZE,
                    MAX_GRID_DIMENSION_SIZE,
                ),
            };
        default:
            return state;
    }
};
