import chai from 'chai';
import sinon from 'sinon';
import { cloneDeep } from 'lodash';
import { BfsStrategy } from './BfsStrategy';
import { MAX_COST_VALUE } from '../../constants/algorithms';
import { GridPosition } from '../../type/NodeData';
import * as utils from '../../utils/utils';

const MOCK_GRID = [
    [1, 1, 1],
    [1, -1, 1],
    [1, -1, 1],
];
const MOCK_COST = Array.from(Array(3), () => Array(3).fill(MAX_COST_VALUE));
const MOCK_START: GridPosition = { rowIndex: 2, colIndex: 0 };
const MOCK_END: GridPosition = { rowIndex: 1, colIndex: 2 };

describe('BfsStrategy', () => {
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    test('BfsStrategy init with the proper reference and value', async () => {
        const mockBuilder = createMockBuilder();
        const bfsStrategy = new BfsStrategy(mockBuilder);
        chai.expect(bfsStrategy.cost).to.equal(mockBuilder.cost);
        chai.expect(bfsStrategy.grid).to.equal(mockBuilder.grid);
        chai.expect(bfsStrategy.startPosition).to.equal(
            mockBuilder.startPosition,
        );
        chai.expect(bfsStrategy.endPosition).to.equal(mockBuilder.endPosition);
    });

    test('BfsStrategy should modify the cost array to the correct value', async () => {
        sandbox.stub(utils, 'sleep').resolves();
        const bfsStrategy = new BfsStrategy(createMockBuilder());
        const expectedCost = [
            [2, 3, 4],
            [1, MAX_COST_VALUE, 5],
            [0, MAX_COST_VALUE, MAX_COST_VALUE],
        ];
        await bfsStrategy.findMinCost();
        chai.expect(bfsStrategy['cost']).to.eql(expectedCost);
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
