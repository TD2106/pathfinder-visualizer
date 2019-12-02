import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { ReduxStore } from '../../type/ReduxStore';
import { setStartEndPosition } from '../gridMarkedPosition/actions';
import {
    createRandomGridMarkedPosition,
    createNewInitialNodesData,
} from './thunkUtils';
import { updateGridConfig } from '../gridConfig/actions';
import { setNodes } from '../nodes/actions';

export const changeGridDimension = (
    rows: number,
    cols: number,
): ThunkAction<void, ReduxStore, {}, AnyAction> => {
    return (dispatch: Dispatch): void => {
        dispatch(updateGridConfig(rows, cols));
        dispatch(setNodes(createNewInitialNodesData(rows, cols)));
        dispatch(
            setStartEndPosition(createRandomGridMarkedPosition(rows, cols)),
        );
    };
};
