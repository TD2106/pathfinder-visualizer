import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { ReduxStore } from '../../type/ReduxStore';
import { createNewInitialNodesData } from './thunkUtils';
import { setNodes } from '../nodes/actions';
import { updateAlgorithmType } from '../algorithmType/actions';

export const changeAlgorithmType = (
    algorithmType: string,
): ThunkAction<void, ReduxStore, {}, AnyAction> => {
    return (dispatch: Dispatch, getState): void => {
        const { rows, cols } = getState().gridConfig;
        dispatch(updateAlgorithmType(algorithmType));
        dispatch(setNodes(createNewInitialNodesData(rows, cols)));
    };
};
