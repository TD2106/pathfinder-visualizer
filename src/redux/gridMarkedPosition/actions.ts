import { ActionCreator, AnyAction } from 'redux';
import { GridPositionActionTypes } from './types';
import { GridMarkedPosition } from '../../type/ReduxStore';

export const setStartEndPosition: ActionCreator<AnyAction> = (
    gridMarkedPosition: GridMarkedPosition,
): AnyAction => {
    return {
        type: GridPositionActionTypes.SET_START_END_POSITION,
        payload: gridMarkedPosition,
    };
};
