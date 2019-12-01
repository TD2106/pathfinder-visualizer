import chai from 'chai';
import sinon from 'sinon';
import { cloneDeep } from 'lodash';
import { AStarStrategy } from './AStarStrategy';
import { MAX_COST_VALUE } from '../../constants/algorithms';
import { GridPosition } from '../../type/NodeData';
import * as utils from '../../utils/utils';
const MOCK_GRID = [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
];
const MOCK_COST = Array.from(Array(4), () => Array(4).fill(MAX_COST_VALUE));
const MOCK_START: GridPosition = { rowIndex: 3, colIndex: 0 };
const MOCK_END: GridPosition = { rowIndex: 0, colIndex: 0 };

describe('AStarStrategy', () => {
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    test('AStarStrategy init with the proper reference and value', async () => {
        const mockBuilder = createMockBuilder();
        const aStarStrategy = new AStarStrategy(mockBuilder);
        chai.expect(aStarStrategy.cost).to.equal(mockBuilder.cost);
        chai.expect(aStarStrategy.grid).to.equal(mockBuilder.grid);
        chai.expect(aStarStrategy.startPosition).to.equal(
            mockBuilder.startPosition,
        );
        chai.expect(aStarStrategy.endPosition).to.equal(
            mockBuilder.endPosition,
        );
    });

    test('AStarStrategy should modify the cost array to the correct value', async () => {
        sandbox.stub(utils, 'sleep').resolves();
        const aStarStrategy = new AStarStrategy(createMockBuilder());
        const expectedCost = [
            [4, 2147483647, 2147483647, 2147483647],
            [3, 2147483647, 2147483647, 2147483647],
            [2, 2147483647, 2147483647, 2147483647],
            [1, 2147483647, 2147483647, 2147483647],
        ];
        await aStarStrategy.findMinCost();
        chai.expect(aStarStrategy['cost']).to.eql(expectedCost);
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
