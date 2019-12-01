import chai from 'chai';
import sinon from 'sinon';
import { PathFinderBuilder } from './PathFinderBuilder';
import { BFS } from '../constants/algorithms';
import { NodeData, GridPosition } from '../type/NodeData';

const MOCK_ALGO_TYPE = BFS;
const MOCK_ROWS = 10;
const MOCK_COLS = 20;
const MOCK_NODES: NodeData[] = [
    {
        rowIndex: 0,
        colIndex: 0,
        weight: 10,
        isPath: false,
        isVisited: false,
        isWall: false,
    },
];
const MOCK_START_POSITION: GridPosition = { rowIndex: 0, colIndex: 0 };
const MOCK_END_POSITION: GridPosition = { rowIndex: 0, colIndex: 1 };

describe('PathFinderBuilder', () => {
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    test('PathFinderBuilder should set the correct argument to the correct attribute', () => {
        const stubUpdateIsPath = sandbox.stub();
        const stubUpdateIsVisited = sandbox.stub();
        const pathFinderBuilder = new PathFinderBuilder()
            .setAlgorithmType(MOCK_ALGO_TYPE)
            .setRows(MOCK_ROWS)
            .setCols(MOCK_COLS)
            .setNodes(MOCK_NODES)
            .setStartPosition(MOCK_START_POSITION)
            .setEndPosition(MOCK_END_POSITION)
            .setUpdateGridUIIsPath(stubUpdateIsPath)
            .setUpdateGridUIIsVisted(stubUpdateIsVisited);
        chai.expect(pathFinderBuilder.algorithmType).to.equal(MOCK_ALGO_TYPE);
        chai.expect(pathFinderBuilder.rows).to.equal(MOCK_ROWS);
        chai.expect(pathFinderBuilder.cols).to.equal(MOCK_COLS);
        chai.expect(pathFinderBuilder.nodes).to.equal(MOCK_NODES);
        chai.expect(pathFinderBuilder.updateGridUIIsPath).to.equal(
            stubUpdateIsPath,
        );
        chai.expect(pathFinderBuilder.updateGridUIIsVisted).to.equal(
            stubUpdateIsVisited,
        );
        chai.expect(pathFinderBuilder.startPosition).to.equal(
            MOCK_START_POSITION,
        );
        chai.expect(pathFinderBuilder.endPosition).to.equal(MOCK_END_POSITION);
    });

    test('PathFinderBuilder should build a path finder', () => {
        const stubUpdateIsPath = sandbox.stub();
        const stubUpdateIsVisited = sandbox.stub();
        const pathFinderBuilder = new PathFinderBuilder()
            .setAlgorithmType(MOCK_ALGO_TYPE)
            .setRows(MOCK_ROWS)
            .setCols(MOCK_COLS)
            .setNodes(MOCK_NODES)
            .setStartPosition(MOCK_START_POSITION)
            .setEndPosition(MOCK_END_POSITION)
            .setUpdateGridUIIsPath(stubUpdateIsPath)
            .setUpdateGridUIIsVisted(stubUpdateIsVisited);
        const pathFinder = pathFinderBuilder.build();
        chai.expect(pathFinder.constructor.name).to.equal('PathFinder');
    });
});
