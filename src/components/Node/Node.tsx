import React from 'react';
import './style.scss';
import { NodeData } from '../../type/NodeData';
import { BLANK_STRING } from '../../constants/commonConstants';
import startIcon from './start.png';
import endIcon from './end.png';

const NODE_CLASS = 'node';

interface Props {
    nodeData: NodeData;
    isDisplayWeight: boolean;
    isStart: boolean;
    isEnd: boolean;
}

export const Node = (props: Props): JSX.Element => {
    const getWeightDisplayValue = (): number | string | JSX.Element=> {
        if(props.isStart){
            return <img src={startIcon} alt="start"/>;
        } else if(props.isEnd){
            return <img src={endIcon} alt="end"/>;
        }
        return props.isDisplayWeight ? props.nodeData.weight : BLANK_STRING;
    };

    return <div className={NODE_CLASS}>{getWeightDisplayValue()}</div>;
};
