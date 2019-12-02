import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import * as utils from '../utils/utils';
import { NodeData, GridPosition } from '../type/NodeData';
import { BFS, MAX_COST_VALUE } from '../constants/algorithms';
import { PathFinder } from './PathFinder';

chai.use(sinonChai);

const MOCK_ROWS = 3;
const MOCK_COLS = 4;
const MOCK_START: GridPosition = { rowIndex: 0, colIndex: 1 };
const MOCK_END: GridPosition = { rowIndex: 2, colIndex: 3 };
const MOCK_UPDATE_IS_PATH = sinon.stub();
const MOCK_UPDATE_IS_VISITED = sinon.stub();

describe('PathFinder', () => {
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    test('PathFinder should init with the correct attributes', () => {
        const pathFinder = new PathFinder(createMockPathFinderBuilder());
        const expectedCost = [
            [MAX_COST_VALUE, MAX_COST_VALUE, MAX_COST_VALUE, MAX_COST_VALUE],
            [MAX_COST_VALUE, MAX_COST_VALUE, MAX_COST_VALUE, MAX_COST_VALUE],
            [MAX_COST_VALUE, MAX_COST_VALUE, MAX_COST_VALUE, MAX_COST_VALUE],
        ];
        const expectedGrid = [
            [-1, 1, 1, 1],
            [1, -1, 1, 1],
            [1, 1, -1, 1],
        ];
        chai.expect(pathFinder['algorithmType']).to.equal(BFS);
        chai.expect(pathFinder['cols']).to.equal(MOCK_COLS);
        chai.expect(pathFinder['rows']).to.equal(MOCK_ROWS);
        chai.expect(pathFinder['updateGridUIIsPath']).to.equal(
            MOCK_UPDATE_IS_PATH,
        );
        chai.expect(pathFinder['updateGridUIIsVisted']).to.equal(
            MOCK_UPDATE_IS_VISITED,
        );
        chai.expect(pathFinder['startPosition']).to.equal(MOCK_START);
        chai.expect(pathFinder['endPosition']).to.equal(MOCK_END);
        chai.expect(pathFinder['grid']).to.eql(expectedGrid);
        chai.expect(pathFinder['cost']).to.eql(expectedCost);
    });

    test('constructPath should return the correct path', () => {
        const pathFinder = new PathFinder(createMockPathFinderBuilder());
        const mockResultCost = [
            [MAX_COST_VALUE, 0, 1, 2],
            [MAX_COST_VALUE, MAX_COST_VALUE, 2, 3],
            [MAX_COST_VALUE, MAX_COST_VALUE, MAX_COST_VALUE, 4],
        ];
        pathFinder['cost'] = mockResultCost;
        const expectedPath = [
            { rowIndex: 0, colIndex: 1 },
            { rowIndex: 0, colIndex: 2 },
            { rowIndex: 0, colIndex: 3 },
            { rowIndex: 1, colIndex: 3 },
            { rowIndex: 2, colIndex: 3 },
        ];
        chai.expect(pathFinder['constructPath']()).to.equal(expectedPath);
    });

    test('visualizePath should return the correct path', async () => {
        sandbox.stub(utils, 'sleep').resolves();
        const mockBuilder = createMockPathFinderBuilder();
        const stubUpdateIsPath = sandbox.stub();
        mockBuilder.updateGridUIIsPath = stubUpdateIsPath;
        const pathFinder = new PathFinder(mockBuilder);
        const mockResultCost = [
            [MAX_COST_VALUE, 0, 1, 2],
            [MAX_COST_VALUE, MAX_COST_VALUE, 2, 3],
            [MAX_COST_VALUE, MAX_COST_VALUE, MAX_COST_VALUE, 4],
        ];
        pathFinder['cost'] = mockResultCost;
        await pathFinder['visualizePath']();
        const expectedPath = [
            { rowIndex: 0, colIndex: 1 },
            { rowIndex: 0, colIndex: 2 },
            { rowIndex: 0, colIndex: 3 },
            { rowIndex: 1, colIndex: 3 },
            { rowIndex: 2, colIndex: 3 },
        ];
        expectedPath.forEach(pos => {
            chai.expect(stubUpdateIsPath).to.have.been.calledWith(
                pos.rowIndex,
                pos.colIndex,
                true,
            );
        });
    });
});

const createMockNodes = (): NodeData[] => {
    const nodes: NodeData[] = [];
    for (let i = 0; i < MOCK_ROWS; i += 1) {
        for (let j = 0; j < MOCK_COLS; j += 1) {
            nodes.push({
                rowIndex: i,
                colIndex: j,
                weight: 1,
                isPath: false,
                isVisited: false,
                isWall: i === j,
            });
        }
    }
    return nodes;
};

const createMockPathFinderBuilder = (): any => {
    return {
        algorithmType: BFS,
        rows: MOCK_ROWS,
        cols: MOCK_COLS,
        updateGridUIIsPath: MOCK_UPDATE_IS_PATH,
        updateGridUIIsVisted: MOCK_UPDATE_IS_VISITED,
        startPosition: MOCK_START,
        endPosition: MOCK_END,
        nodes: createMockNodes(),
    };
};
