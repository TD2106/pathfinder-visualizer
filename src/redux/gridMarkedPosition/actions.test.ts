import chai from 'chai';
import { GridPositionActionTypes } from './types';
import { setStartEndPosition } from './actions';
import { GridMarkedPosition } from '../../type/ReduxStore';

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

describe('GridPositionAction', () => {
    test('setStartEndPosition should return the correct action', () => {
        const expectedAction = {
            type: GridPositionActionTypes.SET_START_END_POSITION,
            payload: MOCK_GRID_MARKED_POSITION,
        };
        chai.expect(setStartEndPosition(MOCK_GRID_MARKED_POSITION)).to.eql(
            expectedAction,
        );
    });
});
