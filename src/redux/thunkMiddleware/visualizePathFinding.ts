import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { ReduxStore } from '../../type/ReduxStore';
import { setNodeIsVisited, setNodeIsPath } from '../nodes/actions';
import { UpdateGridUIBooleanValue } from '../../type/Function';
import { PathFinderBuilder, PathFinder } from '../../algorithms';
import { disableInput, enableInput } from '../isDisabledInput/actions';

export const visualizePathFinding = (): ThunkAction<
    Promise<void>,
    ReduxStore,
    {},
    AnyAction
> => {
    return async (dispatch: Dispatch, getState): Promise<void> => {
        dispatch(disableInput());
        const currentState = getState();
        const pathFinder = createPathFinder(currentState, dispatch);
        await pathFinder.visualizePathFindingProcess();
        dispatch(enableInput());
    };
};

const updateIsVisitedFactory = (
    dispatch: Dispatch,
): UpdateGridUIBooleanValue => {
    return (rowIndex, colIndex, isVisited): void => {
        dispatch(setNodeIsVisited(rowIndex, colIndex, isVisited));
    };
};

const updateIsPathFactory = (dispatch: Dispatch): UpdateGridUIBooleanValue => {
    return (rowIndex, colIndex, isPath): void => {
        dispatch(setNodeIsPath(rowIndex, colIndex, isPath));
    };
};

const createPathFinder = (
    currentState: ReduxStore,
    dispatch: Dispatch,
): PathFinder => {
    return new PathFinderBuilder()
        .setAlgorithmType(currentState.algorithmType)
        .setRows(currentState.gridConfig.rows)
        .setCols(currentState.gridConfig.cols)
        .setNodes(currentState.nodes)
        .setUpdateGridUIIsPath(updateIsPathFactory(dispatch))
        .setUpdateGridUIIsVisted(updateIsVisitedFactory(dispatch))
        .setStartPosition(currentState.gridMarkedPosition.start)
        .setEndPosition(currentState.gridMarkedPosition.end)
        .build();
};
