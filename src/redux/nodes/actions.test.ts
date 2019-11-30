import chai from 'chai';
import { NodesActionTypes } from './types';
import {
    setNodeIsVisited,
    setNodeIsPath,
    setNodeIsWall,
    setNodeWeight,
    setNodes,
} from './actions';
import { NodeData } from '../../type/NodeData';

const MOCK_NODES: NodeData[] = [
    {
        weight: 10,
        rowIndex: 0,
        colIndex: 0,
        isWall: false,
        isPath: true,
        isVisited: true,
    },
];
const MOCK_ROW_INDEX = 0;
const MOCK_COL_INDEX = 1;

describe('NodesActions', () => {
    test('setNodes should return the correct action', () => {
        const expectedAction = {
            type: NodesActionTypes.SET_NODES,
            payload: MOCK_NODES,
        };
        chai.expect(setNodes(MOCK_NODES)).to.eql(expectedAction);
    });

    test('setNodeIsVisited should return the correct action', () => {
        const mockIsVisited = true;
        const expectedAction = {
            type: NodesActionTypes.SET_NODE_IS_PATH,
            payload: {
                rowIndex: MOCK_ROW_INDEX,
                colIndex: MOCK_COL_INDEX,
                isVisited: mockIsVisited,
            },
        };
        chai.expect(
            setNodeIsVisited(MOCK_ROW_INDEX, MOCK_COL_INDEX, mockIsVisited),
        ).to.eql(expectedAction);
    });

    test('setNodeIsPath should return the correct action', () => {
        const mockIsPath = false;
        const expectedAction = {
            type: NodesActionTypes.SET_NODE_IS_PATH,
            payload: {
                rowIndex: MOCK_ROW_INDEX,
                colIndex: MOCK_COL_INDEX,
                isPath: mockIsPath,
            },
        };
        chai.expect(
            setNodeIsPath(MOCK_ROW_INDEX, MOCK_COL_INDEX, mockIsPath),
        ).to.eql(expectedAction);
    });

    test('setNodeIsWall should return the correct action', () => {
        const mockIsWall = false;
        const expectedAction = {
            type: NodesActionTypes.SET_NODE_IS_WALL,
            payload: {
                rowIndex: MOCK_ROW_INDEX,
                colIndex: MOCK_COL_INDEX,
                isWall: mockIsWall,
            },
        };
        chai.expect(
            setNodeIsWall(MOCK_ROW_INDEX, MOCK_COL_INDEX, mockIsWall),
        ).to.eql(expectedAction);
    });

    test('setNodeWeight should return the correct action', () => {
        const mockWeight = 10;
        const expectedAction = {
            type: NodesActionTypes.SET_NODE_WEIGHT,
            payload: {
                rowIndex: MOCK_ROW_INDEX,
                colIndex: MOCK_COL_INDEX,
                weight: mockWeight,
            },
        };
        chai.expect(
            setNodeWeight(MOCK_ROW_INDEX, MOCK_COL_INDEX, mockWeight),
        ).to.eql(expectedAction);
    });
});
