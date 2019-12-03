import React from 'react';
import { ReduxStore, GridConfig } from '../../type/ReduxStore';
import { MIN_GRID_DIMENSION_SIZE, MAX_GRID_DIMENSION_SIZE } from '../../constants/grid';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { changeGridDimension } from '../../redux/thunkMiddleware';

interface State {
    rows: string,
    cols: string,
}

interface DispatchProps {
    dispatchUpdateGridSize: (rows: number, cols: number) => void;
}

interface ReduxStateProps {
    gridConfig: GridConfig,
    isDisabledInput: boolean,
}

type Props = ReduxStateProps & DispatchProps;

class GridSizeForm extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            rows: props.gridConfig.rows.toString(),
            cols: props.gridConfig.cols.toString(),
        }
    }

    handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        this.props.dispatchUpdateGridSize(
            parseInt(this.state.rows),
            parseInt(this.state.cols),
        )
    }

    handleOnChangeRows = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({rows: event.target.value})
    }

    handleOnChangeCols = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({cols: event.target.value})
    }

    render = () => {
        return (
            <form action="post" onSubmit={this.handleSubmit}>
                <label htmlFor="rows">Rows</label>
                <input type="number" name="rows" min={MIN_GRID_DIMENSION_SIZE} max={MAX_GRID_DIMENSION_SIZE} onChange={this.handleOnChangeRows} value={this.state.rows}></input>
                <label htmlFor="cols">Cols</label>
                <input type="number" name="cols" min={MIN_GRID_DIMENSION_SIZE} max={MAX_GRID_DIMENSION_SIZE} onChange={this.handleOnChangeCols} value={this.state.cols}></input>
                <input type="submit" value={'Change grid size'} disabled={this.props.isDisabledInput}></input>
            </form>
        )
    }
}


const mapDispatchToProps = (
    dispatch: ThunkDispatch<ReduxStore, {}, AnyAction>,
): DispatchProps => {
    return {
        dispatchUpdateGridSize: (rows: number, cols: number): void => {
            dispatch(changeGridDimension(rows, cols));
        }
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