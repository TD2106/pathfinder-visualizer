import { ActionCreator, AnyAction } from 'redux';
import { IsDisabledInputActionTypes } from './types';

export const disableInput: ActionCreator<AnyAction> = (): AnyAction => {
    return {
        type: IsDisabledInputActionTypes.DISABLE_INPUT,
    };
};

export const enableInput: ActionCreator<AnyAction> = (): AnyAction => {
    return {
        type: IsDisabledInputActionTypes.ENABLE_INPUT,
    };
};
