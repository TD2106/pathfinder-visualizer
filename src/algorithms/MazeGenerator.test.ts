import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { GridPosition } from '../type/NodeData';
import { MazeGenerator } from './MazeGenerator';
import * as utils from '../utils/utils';

chai.use(sinonChai);

const MOCK_ROWS = 10;
const MOCK_COLS = 20;
const MOCK_UPDATE_IS_WALL = sinon.stub();
const MOCK_START: GridPosition = { rowIndex: 0, colIndex: 1 };
const MOCK_END: GridPosition = { rowIndex: 5, colIndex: 10 };

describe('MazeGenerator', () => {
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    test('MazeGenerator should init with the correct value', () => {
        const mazeGenerator = new MazeGenerator(createMockMazeGenBuilder());
        chai.expect(mazeGenerator['rows']).to.equal(MOCK_ROWS);
        chai.expect(mazeGenerator['cols']).to.equal(MOCK_COLS);
        chai.expect(mazeGenerator['updateGridUIIsWall']).to.equal(
            MOCK_UPDATE_IS_WALL,
        );
        chai.expect(mazeGenerator['startPosition']).to.equal(MOCK_START);
        chai.expect(mazeGenerator['endPosition']).to.equal(MOCK_END);
    });

    test('isPositionNotStartOrEndPosition should return the correct value', () => {
        const mazeGenerator = new MazeGenerator(createMockMazeGenBuilder());
        for (let i = 0; i < MOCK_ROWS; i += 1) {
            for (let j = 0; j < MOCK_COLS; j += 1) {
                if (
                    (i === MOCK_START.rowIndex && j === MOCK_START.colIndex) ||
                    (i === MOCK_END.rowIndex && j === MOCK_END.colIndex)
                ) {
                    chai.expect(
                        mazeGenerator['isPositionNotStartOrEndPosition'](i, j),
                    ).to.be.false;
                } else {
                    chai.expect(
                        mazeGenerator['isPositionNotStartOrEndPosition'](i, j),
                    ).to.be.true;
                }
            }
        }
    });

    test('constructMaze should not update the start position and end position with is wall', async () => {
        sandbox.stub(utils, 'sleep').resolves();
        for (let i = 0; i < 100; i += 1) {
            const mockBuilder = createMockMazeGenBuilder();
            const stubUpdate = sandbox.stub();
            mockBuilder.updateGridUIIsWall = stubUpdate;
            const mazeGenerator = new MazeGenerator(mockBuilder);
            await mazeGenerator.constructMaze();
            chai.expect(stubUpdate).to.have.been.called;
            chai.expect(stubUpdate).to.have.not.been.calledWith(
                MOCK_START.rowIndex,
                MOCK_START.colIndex,
                true,
            );
            chai.expect(stubUpdate).to.have.not.been.calledWith(
                MOCK_END.rowIndex,
                MOCK_END.colIndex,
                true,
            );
        }
    });
});

const createMockMazeGenBuilder = (): any => {
    return {
        rows: MOCK_ROWS,
        cols: MOCK_COLS,
        updateGridUIIsWall: MOCK_UPDATE_IS_WALL,
        startPosition: MOCK_START,
        endPosition: MOCK_END,
    };
};
