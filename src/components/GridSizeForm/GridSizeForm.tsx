import React from 'react';
import { ReduxStore, GridConfig } from '../../type/ReduxStore';
import {
    MIN_GRID_DIMENSION_SIZE,
    MAX_GRID_DIMENSION_SIZE,
} from '../../constants/grid';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { changeGridDimension } from '../../redux/thunkMiddleware';

import './style.scss';

const GRID_SIZE_FORM_CLASS = 'grid-size-form';

interface State {
    rows: string;
    cols: string;
}

interface DispatchProps {
    dispatchUpdateGridSize: (rows: number, cols: number) => void;
}

interface ReduxStateProps {
    gridConfig: GridConfig;
    isDisabledInput: boolean;
}

type Props = ReduxStateProps & DispatchProps;

class GridSizeForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            rows: props.gridConfig.rows.toString(),
            cols: props.gridConfig.cols.toString(),
        };
    }

    handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        this.props.dispatchUpdateGridSize(
            parseInt(this.state.rows),
            parseInt(this.state.cols),
        );
    };

    handleOnChangeRows = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ rows: event.target.value });
    };

    handleOnChangeCols = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ cols: event.target.value });
    };

    render = (): JSX.Element => {
        return (
            <form
                className={GRID_SIZE_FORM_CLASS}
                action="post"
                onSubmit={this.handleSubmit}
            >
                <label htmlFor="rows">Rows</label>
                <input
                    type="number"
                    name="rows"
                    min={MIN_GRID_DIMENSION_SIZE}
                    max={MAX_GRID_DIMENSION_SIZE}
                    onChange={this.handleOnChangeRows}
                    value={this.state.rows}
                ></input>
                <label htmlFor="cols">Columns</label>
                <input
                    type="number"
                    name="cols"
                    min={MIN_GRID_DIMENSION_SIZE}
                    max={MAX_GRID_DIMENSION_SIZE}
                    onChange={this.handleOnChangeCols}
                    value={this.state.cols}
                ></input>
                <button type="submit" disabled={this.props.isDisabledInput}>
                    Change grid size
                </button>
            </form>
        );
    };
}

const mapDispatchToProps = (
    dispatch: ThunkDispatch<ReduxStore, {}, AnyAction>,
): DispatchProps => {
    return {
        dispatchUpdateGridSize: (rows: number, cols: number): void => {
            dispatch(changeGridDimension(rows, cols));
        },
    };
};

const mapStateToProps = (state: ReduxStore): ReduxStateProps => {
    return {
        gridConfig: state.gridConfig,
        isDisabledInput: state.isDisabledInput,
    };
};

export default connect<ReduxStateProps, DispatchProps, {}, ReduxStore>(
    mapStateToProps,
    mapDispatchToProps,
)(GridSizeForm);
