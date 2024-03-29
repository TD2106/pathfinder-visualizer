import React from 'react';
import { ReduxStore } from '../../type/ReduxStore';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { changeAlgorithmType } from '../../redux/thunkMiddleware/changeAlgoType';
import Select from 'react-select';
import { ALGORITHM_OPTIONS } from '../../constants/algorithms';
import './style.scss';

interface ReduxStateProps {
    algorithmType: string;
    isDisabledInput: boolean;
}

interface DispatchProps {
    changeAlgoType: (algorithmType: string) => void;
}

type Props = ReduxStateProps & DispatchProps;

const ALGORITHM_SELECTOR_CLASS = 'algorithm-selector';

export const AlgorithmSelector = (props: Props): JSX.Element => {
    const onChangeAlgoType = (option: any): void => {
        props.changeAlgoType(option.value);
    };

    const getCurrentOption = () => {
        const currentOption = ALGORITHM_OPTIONS.find(option => {
            return option.value === props.algorithmType;
        });
        return currentOption || ALGORITHM_OPTIONS[0];
    };

    return (
        <div className={ALGORITHM_SELECTOR_CLASS}>
            <Select
                disabled={props.isDisabledInput}
                options={ALGORITHM_OPTIONS}
                onChange={onChangeAlgoType}
                value={getCurrentOption()}
            />
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
        changeAlgoType: (algorithmType: string): void =>
            dispatch(changeAlgorithmType(algorithmType)),
    };
};
export default connect<ReduxStateProps, DispatchProps, {}, ReduxStore>(
    mapStateToProps,
    mapDispatchToProps,
)(AlgorithmSelector);
