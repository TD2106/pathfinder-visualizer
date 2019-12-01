import chai from 'chai';
import sinon from 'sinon';
import { cloneDeep } from 'lodash';
import { DijkstraStrategy } from './DijkstraStrategy';
import { MAX_COST_VALUE } from '../../constants/algorithms';
import { GridPosition } from '../../type/NodeData';
import * as utils from '../../utils/utils';

const MOCK_GRID = [
    [1, 2, 1],
    [1, 100, 1],
    [1, 10, 1],
];
const MOCK_COST = Array.from(Array(3), () => Array(3).fill(MAX_COST_VALUE));
const MOCK_START: GridPosition = { rowIndex: 2, colIndex: 0 };
const MOCK_END: GridPosition = { rowIndex: 1, colIndex: 2 };

describe('DijkstraStrategy', () => {
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    test('DijkstraStrategy init with the proper reference and value', async () => {
        const mockBuilder = createMockBuilder();
        const dijkstraStrategy = new DijkstraStrategy(mockBuilder);
        chai.expect(dijkstraStrategy.cost).to.equal(mockBuilder.cost);
        chai.expect(dijkstraStrategy.grid).to.equal(mockBuilder.grid);
        chai.expect(dijkstraStrategy.startPosition).to.equal(
            mockBuilder.startPosition,
        );
        chai.expect(dijkstraStrategy.endPosition).to.equal(
            mockBuilder.endPosition,
        );
    });

    test('DijkstraStrategy should modify the cost array to the correct value', async () => {
        sandbox.stub(utils, 'sleep').resolves();
        const dijkstraStrategy = new DijkstraStrategy(createMockBuilder());
        const expectedCost = [
            [2, 4, 5],
            [1, MAX_COST_VALUE, 6],
            [0, MAX_COST_VALUE, MAX_COST_VALUE],
        ];
        await dijkstraStrategy.findMinCost();
        chai.expect(dijkstraStrategy['cost']).to.eql(expectedCost);
    });
});

const createMockBuilder = (): any => {
    return {
        grid: MOCK_GRID,
        cost: cloneDeep(MOCK_COST),
        startPosition: MOCK_START,
        endPosition: MOCK_END,
        updateGridUIIsVisited: sinon.stub(),
    };
};
