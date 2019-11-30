import { ActionCreator, AnyAction } from 'redux';
import { NodesActionTypes } from './types';
import { NodeData } from '../../type/NodeData';

export const setNodes: ActionCreator<AnyAction> = (
    nodes: NodeData[],
): AnyAction => {
    return {
        type: NodesActionTypes.SET_NODES,
        payload: nodes,
    };
};

export const setNodeWeight: ActionCreator<AnyAction> = (
    rowIndex: number,
    colIndex: number,
    weight: number,
): AnyAction => {
    return {
        type: NodesActionTypes.SET_NODE_WEIGHT,
        payload: {
            rowIndex,
            colIndex,
            weight,
        },
    };
};

export const setNodeIsWall: ActionCreator<AnyAction> = (
    rowIndex: number,
    colIndex: number,
    isWall: boolean,
): AnyAction => {
    return {
        type: NodesActionTypes.SET_NODE_IS_WALL,
        payload: {
            rowIndex,
            colIndex,
            isWall,
        },
    };
};

export const setNodeIsPath: ActionCreator<AnyAction> = (
    rowIndex: number,
    colIndex: number,
    isPath: boolean,
): AnyAction => {
    return {
        type: NodesActionTypes.SET_NODE_IS_PATH,
        payload: {
            rowIndex,
            colIndex,
            isPath,
        },
    };
};

export const setNodeIsVisited: ActionCreator<AnyAction> = (
    rowIndex: number,
    colIndex: number,
    isVisited: boolean,
): AnyAction => {
    return {
        type: NodesActionTypes.SET_NODE_IS_VISITED,
        payload: {
            rowIndex,
            colIndex,
            isVisited,
        },
    };
};
