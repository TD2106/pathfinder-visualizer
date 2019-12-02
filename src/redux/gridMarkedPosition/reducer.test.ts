import chai from 'chai';
import { gridMarkedPositionReducer } from './reducer';
import { setStartEndPosition } from './actions';
import { AnyAction } from 'redux';
import { GridMarkedPosition } from '../../type/ReduxStore';
import { INITIAL_GRID_MARKED_POSITION } from '../../constants/ReduxStore';

const MOCK_GRID_MARKED_POSITION: GridMarkedPosition = {
    start: {
        rowIndex: 0,
        colIndex: 0,
    },
    end: {
        rowIndex: 1,
        colIndex: 1,
    },
};

describe('gridMarkedPositionReducer', () => {
    test('gridMarkedPositionReducer should return the correct state if the action is set start end position', () => {
        const expectResult = MOCK_GRID_MARKED_POSITION;
        chai.expect(
            gridMarkedPositionReducer(
                INITIAL_GRID_MARKED_POSITION,
                setStartEndPosition(MOCK_GRID_MARKED_POSITION),
            ),
        ).to.eql(expectResult);
    });

    test('gridMarkedPositionReducer should return the initial state if it is a random action', () => {
        const expectResult = INITIAL_GRID_MARKED_POSITION;
        const mockAction: AnyAction = { type: 'random' };
        chai.expect(
            gridMarkedPositionReducer(INITIAL_GRID_MARKED_POSITION, mockAction),
        ).to.equal(expectResult);
    });
});
