import { Reducer, AnyAction } from 'redux';
import { AlgorithmTypeActionTypes } from './types';
import { INITIAL_ALGORITHM_TYPE } from '../../constants/ReduxStore';

export const algorithmTypeReducer: Reducer<string> = (
    state: string = INITIAL_ALGORITHM_TYPE,
    action: AnyAction,
): string => {
    switch (action.type) {
        case AlgorithmTypeActionTypes.UPDATE_ALGORITHM_TYPE:
            return action.payload;
        default:
            return state;
    }
};
