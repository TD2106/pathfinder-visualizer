import { ActionCreator, AnyAction } from 'redux';
import { GridConfigActionTypes } from './types';

export const updateGridConfig: ActionCreator<AnyAction> = (
    rows: number,
    cols: number,
): AnyAction => {
    return {
        type: GridConfigActionTypes.UPDATE_GRID_CONFIG,
        payload: { rows, cols },
    };
};
