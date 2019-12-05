import React from 'react';
import './style.scss';
import { NodeData } from '../../type/NodeData';
import { BLANK_STRING } from '../../constants/commonConstants';
import startIcon from './start.png';
import endIcon from './end.png';
import { WALL, VISITED, PATH } from '../../constants/nodeColor';

const NODE_CLASS = 'node';

interface Props {
    nodeData: NodeData;
    isDisplayWeight: boolean;
    isStart: boolean;
    isEnd: boolean;
}

export const Node = (props: Props): JSX.Element => {
    const getWeightDisplayValue = (): number | string | JSX.Element => {
        if (props.isStart) {
            return <img src={startIcon} alt="start" />;
        } else if (props.isEnd) {
            return <img src={endIcon} alt="end" />;
        }
        return props.isDisplayWeight ? props.nodeData.weight : BLANK_STRING;
    };

    const getBackgroundColor = (): string => {
        if (props.nodeData.isPath) {
            return PATH;
        } else if (props.nodeData.isVisited) {
            return VISITED;
        } else if (props.nodeData.isWall) {
            return WALL;
        } else {
            return 'transparent';
        }
    };

    return (
        <div
            className={NODE_CLASS}
            style={{ backgroundColor: getBackgroundColor() }}
        >
            {getWeightDisplayValue()}
        </div>
    );
};
