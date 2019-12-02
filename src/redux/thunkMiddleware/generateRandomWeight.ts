import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { ReduxStore } from '../../type/ReduxStore';
import { setNodeWeight } from '../nodes/actions';
import { generateRandomIntegerInRange } from '../../utils';
import { MIN_NODE_WEIGHT, MAX_NODE_WEIGHT } from '../../constants/algorithms';

export const generateRandomWeightForNodes = (): ThunkAction<
    void,
    ReduxStore,
    {},
    AnyAction
> => {
    return (dispatch: Dispatch, getState): void => {
        const { rows, cols } = getState().gridConfig;
        for (let rowIndex = 0; rowIndex < rows; rowIndex += 1) {
            for (let colIndex = 0; colIndex < cols; colIndex += 1) {
                dispatch(
                    setNodeWeight(
                        rowIndex,
                        colIndex,
                        generateRandomIntegerInRange(
                            MIN_NODE_WEIGHT,
                            MAX_NODE_WEIGHT,
                        ),
                    ),
                );
            }
        }
    };
};
