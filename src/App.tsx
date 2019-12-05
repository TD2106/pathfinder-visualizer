import React from 'react';
import { connect } from 'react-redux';
import { ReduxStore } from './type/ReduxStore';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { resetGrid } from './redux/thunkMiddleware';
import ConnectedNodeGrid from './components/NodeGrid';
import { ConnectedAlgorithmSelector } from './components/AlgorithmSelector';
import { ConnectedControllerButtons } from './components/ControllerButtons';
import { ConnectedGridSizeForm } from './components/GridSizeForm';

import { VISITED, WALL, PATH } from './constants/nodeColor';
import startIcon from './components/Node/start.png';
import endIcon from './components/Node/end.png';

import './style.scss';

interface DispatchProps {
    initGrid: () => void;
}

type Props = DispatchProps;

const MAIN_APP_CLASS = 'pathfinder-visualizer-app';
const HEADER_CLASS = 'header';
const GRID_CONTAINER_CLASS = 'grid-container';
const NOTATION_CLASS = 'notation-container';

export class App extends React.Component<Props> {
    public componentDidMount = (): void => {
        this.props.initGrid();
    };

    public render(): JSX.Element {
        return (
            <div className={MAIN_APP_CLASS}>
                <div className={HEADER_CLASS}>
                    <ConnectedAlgorithmSelector />
                    <ConnectedControllerButtons />
                </div>
                <ConnectedGridSizeForm />
                <div className={NOTATION_CLASS}>
                    <img src={startIcon} alt="start icon"></img>{' '}
                    <label>Origin</label>
                    <img src={endIcon} alt="end icon"></img>{' '}
                    <label>Destination</label>
                    <div
                        style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
                    ></div>
                    <label>Unvisited node</label>
                    <div style={{ backgroundColor: WALL }}></div>
                    <label>Wall node</label>
                    <div style={{ backgroundColor: VISITED }}></div>
                    <label>Visited node</label>
                    <div style={{ backgroundColor: PATH }}></div>
                    <label>Path node</label>
                </div>
                <div className={GRID_CONTAINER_CLASS}>
                    <ConnectedNodeGrid />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (
    dispatch: ThunkDispatch<ReduxStore, {}, AnyAction>,
): DispatchProps => {
    return {
        initGrid: (): void => dispatch(resetGrid()),
    };
};

export default connect<{}, DispatchProps, {}, ReduxStore>(
    null,
    mapDispatchToProps,
)(App);
