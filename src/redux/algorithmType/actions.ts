import { ActionCreator, AnyAction } from 'redux';
import { AlgorithmTypeActionTypes } from './types';

export const updateAlgorithmType: ActionCreator<AnyAction> = (
    algorithm: string,
): AnyAction => {
    return {
        type: AlgorithmTypeActionTypes.UPDATE_ALGORITHM_TYPE,
        payload: algorithm,
    };
};
