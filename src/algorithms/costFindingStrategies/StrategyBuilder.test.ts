import chai from 'chai';
import sinon from 'sinon';
import { CostFindingStrategyBuilder } from './StrategyBuilder';
import {
    BFS,
    MAX_COST_VALUE,
    DIJKSTRA,
    ASTAR,
} from '../../constants/algorithms';
import { GridPosition } from '../../type/NodeData';

const MOCK_GRID = [
    [1, 2],
    [1, -1],
];
const MOCK_COST = [
    [MAX_COST_VALUE, MAX_COST_VALUE],
    [MAX_COST_VALUE, MAX_COST_VALUE],
];
const MOCK_START_POSITION: GridPosition = { rowIndex: 0, colIndex: 0 };
const MOCK_END_POSITION: GridPosition = { rowIndex: 0, colIndex: 1 };

describe('CostFindingStrategyBuilder', () => {
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    test('CostFindingStrategyBuilder should set the correct argument to the correct attribute', () => {
        const stubUpdateIsVisited = sandbox.stub();
        const costFinderStrategyBuilder = new CostFindingStrategyBuilder()
            .setStartPosition(MOCK_START_POSITION)
            .setEndPosition(MOCK_END_POSITION)
            .setUpdateGridUIIsVisted(stubUpdateIsVisited)
            .setCost(MOCK_COST)
            .setGrid(MOCK_GRID);
        chai.expect(costFinderStrategyBuilder.grid).to.equal(MOCK_GRID);
        chai.expect(costFinderStrategyBuilder.cost).to.equal(MOCK_COST);
        chai.expect(costFinderStrategyBuilder.updateGridUIIsVisited).to.equal(
            stubUpdateIsVisited,
        );
        chai.expect(costFinderStrategyBuilder.startPosition).to.equal(
            MOCK_START_POSITION,
        );
        chai.expect(costFinderStrategyBuilder.endPosition).to.equal(
            MOCK_END_POSITION,
        );
    });

    test('CostFindingStrategyBuilder should build correct cost finder strategy based on the passed in algorithm type', () => {
        const stubUpdateIsVisited = sandbox.stub();
        const costFinderStrategyBuilder = new CostFindingStrategyBuilder()
            .setStartPosition(MOCK_START_POSITION)
            .setEndPosition(MOCK_END_POSITION)
            .setUpdateGridUIIsVisted(stubUpdateIsVisited)
            .setCost(MOCK_COST)
            .setGrid(MOCK_GRID);
        let costFinder = costFinderStrategyBuilder.build(BFS);
        chai.expect(costFinder.constructor.name).to.equal('BfsStrategy');
        costFinder = costFinderStrategyBuilder.build(DIJKSTRA);
        chai.expect(costFinder.constructor.name).to.equal('DijkstraStrategy');
        costFinder = costFinderStrategyBuilder.build(ASTAR);
        chai.expect(costFinder.constructor.name).to.equal('AStarStrategy');
    });
});
