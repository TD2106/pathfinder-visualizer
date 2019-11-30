import chai from 'chai';
import { nodesReducer } from './reducer';
import { 
    setNodes,
    setNodeIsPath,
    setNodeIsVisited,
    setNodeIsWall,
    setNodeWeight    
} from './actions';
import { AnyAction } from 'redux';
import { NodeData } from '../../type/NodeData';
import { INITIAL_NODES } from '../../constants/ReduxStore';

const MOCK_NODES: NodeData[] = [
    {
        weight: 10,
        rowIndex: 0,
        colIndex: 0,
        isWall: false,
        isPath: true,
        isVisited: true,
    },
    {
        weight: 10,
        rowIndex: 0,
        colIndex: 1,
        isWall: false,
        isPath: false,
        isVisited: false,
    }
];
const MOCK_ROW_INDEX = 0;
const MOCK_COL_INDEX = 1;

describe('nodesReducer', () => {
    test('nodesReducer should return the correct result when the action is set nodes', () => {
        chai.expect(
            nodesReducer(INITIAL_NODES, setNodes(MOCK_NODES))
        ).to.eql(MOCK_NODES);
    })

    test('nodesReducer should return the correct result when the action is set node weight', () => {
        const mockWeight = 100;
        const expectedNodes: NodeData[] = [
            MOCK_NODES[0],
            {
                ...MOCK_NODES[1],
                weight: mockWeight
            }
        ];
        chai.expect(
            nodesReducer(MOCK_NODES, setNodeWeight(MOCK_ROW_INDEX, MOCK_COL_INDEX, mockWeight))
        ).to.eql(expectedNodes);
    })

    test('nodesReducer should return the correct result when the action is set node isWall', () => {
        const mockIsWall = true;
        const expectedNodes: NodeData[] = [
            MOCK_NODES[0],
            {
                ...MOCK_NODES[1],
                isWall: mockIsWall
            }
        ];
        chai.expect(
            nodesReducer(MOCK_NODES, setNodeIsWall(MOCK_ROW_INDEX, MOCK_COL_INDEX, mockIsWall))
        ).to.eql(expectedNodes);
    })

    test('nodesReducer should return the correct result when the action is set node isPath', () => {
        const mockIsPath = true;
        const expectedNodes: NodeData[] = [
            MOCK_NODES[0],
            {
                ...MOCK_NODES[1],
                isPath: mockIsPath
            }
        ];
        chai.expect(
            nodesReducer(MOCK_NODES, setNodeIsPath(MOCK_ROW_INDEX, MOCK_COL_INDEX, mockIsPath))
        ).to.eql(expectedNodes);
    })

    test('nodesReducer should return the correct result when the action is set node isVisited', () => {
        const mockIsVisited = true;
        const expectedNodes: NodeData[] = [
            MOCK_NODES[0],
            {
                ...MOCK_NODES[1],
                isVisited: mockIsVisited
            }
        ];
        chai.expect(
            nodesReducer(MOCK_NODES, setNodeIsVisited(MOCK_ROW_INDEX, MOCK_COL_INDEX, mockIsVisited))
        ).to.eql(expectedNodes);
    })
});
