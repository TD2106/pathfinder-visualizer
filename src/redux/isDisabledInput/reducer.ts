import { Reducer, AnyAction } from 'redux';
import { IsDisabledInputActionTypes } from './types';
import { INITIAL_IS_DISABLED_INPUT } from '../../constants/ReduxStore';

export const isDisabledInputReducer: Reducer<boolean> = (
    state: boolean = INITIAL_IS_DISABLED_INPUT,
    action: AnyAction,
): boolean => {
    switch (action.type) {
        case IsDisabledInputActionTypes.DISABLE_INPUT:
            return true;
        case IsDisabledInputActionTypes.ENABLE_INPUT:
            return false;
        default:
            return state;
    }
};
