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

interface DispatchProps {
    initGrid: () => void;
}

type Props = DispatchProps;

const MAIN_APP_CLASS = 'pathfinder-visualizer-app';

export class App extends React.Component<Props> {
    public componentDidMount = (): void => {
        this.props.initGrid();
    };

    public render(): JSX.Element {
        return (
            <div className={MAIN_APP_CLASS}>
                <ConnectedAlgorithmSelector/>
                <ConnectedControllerButtons/>
                <ConnectedGridSizeForm/>
                <ConnectedNodeGrid />
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
