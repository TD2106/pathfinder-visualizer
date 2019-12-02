import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { ReduxStore } from '../../type/ReduxStore';
import { setStartEndPosition } from '../gridMarkedPosition/actions';
import {
    createRandomGridMarkedPosition,
    createNewInitialNodesData,
} from './thunkUtils';
import { setNodes } from '../nodes/actions';

export const resetGrid = (): ThunkAction<void, ReduxStore, {}, AnyAction> => {
    return (dispatch: Dispatch, getState): void => {
        const { rows, cols } = getState().gridConfig;
        dispatch(setNodes(createNewInitialNodesData(rows, cols)));
        dispatch(
            setStartEndPosition(createRandomGridMarkedPosition(rows, cols)),
        );
    };
};
