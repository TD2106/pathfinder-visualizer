import chai from 'chai';
import sinon from 'sinon';
import { MazeGeneratorBuilder } from './MazeGeneratorBuilder';
import { NodeData, GridPosition } from '../type/NodeData';

const MOCK_ROWS = 10;
const MOCK_COLS = 20;
const MOCK_START_POSITION: GridPosition = { rowIndex: 0, colIndex: 0 };
const MOCK_END_POSITION: GridPosition = { rowIndex: 0, colIndex: 1 };

describe('MazeGeneratorBuilder', () => {
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    test('MazeGeneratorBuilder should set the correct argument to the correct attribute', () => {
        const stubUpdateIsWall = sandbox.stub();
        const mazeGeneratorBuilder = new MazeGeneratorBuilder()
            .setRows(MOCK_ROWS)
            .setCols(MOCK_COLS)
            .setStartPosition(MOCK_START_POSITION)
            .setEndPosition(MOCK_END_POSITION)
            .setUpdateGridUIIsWall(stubUpdateIsWall);
        chai.expect(mazeGeneratorBuilder.rows).to.equal(MOCK_ROWS);
        chai.expect(mazeGeneratorBuilder.cols).to.equal(MOCK_COLS);
        chai.expect(mazeGeneratorBuilder.updateGridUIIsWall).to.equal(
            stubUpdateIsWall,
        );
        chai.expect(mazeGeneratorBuilder.startPosition).to.equal(
            MOCK_START_POSITION,
        );
        chai.expect(mazeGeneratorBuilder.endPosition).to.equal(
            MOCK_END_POSITION,
        );
    });

    test('MazeGeneratorBuilder should build a path finder', () => {
        const stubUpdateIsWall = sandbox.stub();
        const mazeGeneratorBuilder = new MazeGeneratorBuilder()
            .setRows(MOCK_ROWS)
            .setCols(MOCK_COLS)
            .setStartPosition(MOCK_START_POSITION)
            .setEndPosition(MOCK_END_POSITION)
            .setUpdateGridUIIsWall(stubUpdateIsWall);
        const mazeGenerator = mazeGeneratorBuilder.build();
        chai.expect(mazeGenerator.constructor.name).to.equal('MazeGenerator');
    });
});
