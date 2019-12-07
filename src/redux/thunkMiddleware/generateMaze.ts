import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { ReduxStore } from '../../type/ReduxStore';
import { setNodeIsWall } from '../nodes/actions';
import { MazeGenerator, MazeGeneratorBuilder } from '../../algorithms';
import { disableInput, enableInput } from '../isDisabledInput/actions';
import { updateNodeUIFactory } from './thunkUtils';

export const generateMaze = (): ThunkAction<
    Promise<void>,
    ReduxStore,
    {},
    AnyAction
> => {
    return async (dispatch: Dispatch, getState): Promise<void> => {
        dispatch(disableInput());
        const currentState = getState();
        const mazeGenerator = createMazeGenerator(currentState, dispatch);
        await mazeGenerator.constructMaze();
        dispatch(enableInput());
    };
};

const createMazeGenerator = (
    currentState: ReduxStore,
    dispatch: Dispatch,
): MazeGenerator => {
    return new MazeGeneratorBuilder()
        .setRows(currentState.gridConfig.rows)
        .setCols(currentState.gridConfig.cols)
        .setUpdateGridUIIsWall(updateNodeUIFactory(dispatch, setNodeIsWall))
        .setStartPosition(currentState.gridMarkedPosition.start)
        .setEndPosition(currentState.gridMarkedPosition.end)
        .build();
};
