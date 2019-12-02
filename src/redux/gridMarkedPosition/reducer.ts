import { Reducer, AnyAction } from 'redux';
import { GridPositionActionTypes } from './types';
import { GridMarkedPosition } from '../../type/ReduxStore';
import { INITIAL_GRID_MARKED_POSITION } from '../../constants/ReduxStore';

export const gridMarkedPositionReducer: Reducer<GridMarkedPosition> = (
    state: GridMarkedPosition = INITIAL_GRID_MARKED_POSITION,
    action: AnyAction,
): GridMarkedPosition => {
    switch (action.type) {
        case GridPositionActionTypes.SET_START_END_POSITION:
            return action.payload;
        default:
            return state;
    }
};
