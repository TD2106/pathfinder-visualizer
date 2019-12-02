import React from 'react';
import './style.css';
import { NodeData } from '../../type/NodeData';
import { BLANK_STRING } from '../../constants/commonConstants';

const NODE_CLASS = 'node';

interface Props {
    nodeData: NodeData;
    isDisplayWeight: boolean;
}

export const Node = (props: Props): JSX.Element => {
    const getWeightDisplayValue = (): number | string => {
        return props.isDisplayWeight ? props.nodeData.weight : BLANK_STRING;
    };

    return <div className={NODE_CLASS}>{getWeightDisplayValue()}</div>;
};
