import { Reducer, AnyAction } from 'redux';
import { NodesActionTypes } from './types';
import { INITIAL_NODES } from '../../constants/ReduxStore';
import { NodeData } from '../../type/NodeData';

const NODE_WEIGHT_KEY = 'weight';
const NODE_IS_WALL_KEY = 'isWall';
const NODE_IS_PATH_KEY = 'isPath';
const NODE_IS_VISITED_KEY = 'isVisited';

export const nodesReducer: Reducer<NodeData[]> = (
    state: NodeData[] = INITIAL_NODES,
    action: AnyAction,
): NodeData[] => {
    switch (action.type) {
        case NodesActionTypes.SET_NODES:
            return action.payload;
        case NodesActionTypes.SET_NODE_IS_PATH:
            return createNewNodesFromAction(
                state,
                action.payload.rowIndex,
                action.payload.colIndex,
                NODE_IS_PATH_KEY,
                action.payload.isPath,
            );
        case NodesActionTypes.SET_NODE_WEIGHT:
            return createNewNodesFromAction(
                state,
                action.payload.rowIndex,
                action.payload.colIndex,
                NODE_WEIGHT_KEY,
                action.payload.weight,
            );
        case NodesActionTypes.SET_NODE_IS_VISITED:
            return createNewNodesFromAction(
                state,
                action.payload.rowIndex,
                action.payload.colIndex,
                NODE_IS_VISITED_KEY,
                action.payload.isVisited,
            );
        case NodesActionTypes.SET_NODE_IS_WALL:
            return createNewNodesFromAction(
                state,
                action.payload.rowIndex,
                action.payload.colIndex,
                NODE_IS_WALL_KEY,
                action.payload.isWall,
            );
        default:
            return state;
    }
};

const createNewNodesFromAction = (
    currentNodes: NodeData[],
    rowIndex: number,
    colIndex: number,
    key: string,
    newValue: number | boolean,
): NodeData[] => {
    return currentNodes.map(
        (node): NodeData => {
            if (node.rowIndex === rowIndex && node.colIndex === colIndex) {
                return {
                    ...node,
                    [key]: newValue,
                };
            }
            return node;
        },
    );
};
