import React from 'react';
import { ReduxStore } from '../../type/ReduxStore';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { DIJKSTRA } from '../../constants/algorithms';
import {
    visualizePathFinding,
    generateMaze,
    generateRandomWeightForNodes,
    resetGrid,
} from '../../redux/thunkMiddleware';
import './style.scss';

interface ReduxStateProps {
    algorithmType: string;
    isDisabledInput: boolean;
}

interface DispatchProps {
    dispatchVisualizePathFinding: () => void;
    dispatchGenerateMaze: () => void;
    dispatchGenerateRandomWeight: () => void;
    dispatchResetGrid: () => void;
}

type Props = ReduxStateProps & DispatchProps;

const CONTROLLER_BUTTONS_CLASS = 'controller-buttons';

export const ControllerButtons = (props: Props): JSX.Element => {
    return (
        <div className={CONTROLLER_BUTTONS_CLASS}>
            <button
                onClick={props.dispatchVisualizePathFinding}
                disabled={props.isDisabledInput}
            >
                Visualize Pathfinding
            </button>
            <button
                onClick={props.dispatchGenerateMaze}
                disabled={props.isDisabledInput}
            >
                Generate Maze
            </button>
            <button
                onClick={props.dispatchResetGrid}
                disabled={props.isDisabledInput}
            >
                Reset Grid
            </button>
            <button
                onClick={props.dispatchGenerateRandomWeight}
                disabled={
                    props.algorithmType !== DIJKSTRA || props.isDisabledInput
                }
            >
                Generate random weight for nodes
            </button>
        </div>
    );
};

const mapStateToProps = (state: ReduxStore): ReduxStateProps => {
    return {
        algorithmType: state.algorithmType,
        isDisabledInput: state.isDisabledInput,
    };
};

const mapDispatchToProps = (
    dispatch: ThunkDispatch<ReduxStore, {}, AnyAction>,
): DispatchProps => {
    return {
        dispatchVisualizePathFinding: (): void => {
            dispatch(visualizePathFinding());
        },
        dispatchGenerateMaze: (): void => {
            dispatch(generateMaze());
        },
        dispatchGenerateRandomWeight: (): void => {
            dispatch(generateRandomWeightForNodes());
        },
        dispatchResetGrid: (): void => {
            dispatch(resetGrid());
        },
    };
};
export default connect<ReduxStateProps, DispatchProps, {}, ReduxStore>(
    mapStateToProps,
    mapDispatchToProps,
)(ControllerButtons);
