import chai from 'chai';
import { gridConfigReducer } from './reducer';
import { updateGridConfig } from './actions';
import { AnyAction } from 'redux';
import { INITIAL_GRID_CONFIG } from '../../constants/ReduxStore';

describe('gridConfigReducer', () => {
    test('gridConfigReducer should return the correct state if the action is update grid config', () => {
        const mockRows = 50,
            mockCols = 40;
        const expectResult = { rows: mockRows, cols: mockCols };
        chai.expect(
            gridConfigReducer(
                INITIAL_GRID_CONFIG,
                updateGridConfig(mockRows, mockCols),
            ),
        ).to.eql(expectResult);
    });

    test('gridConfigReducer should return the initial state if it is a random action', () => {
        const expectResult = INITIAL_GRID_CONFIG;
        const mockAction: AnyAction = { type: 'random' };
        chai.expect(gridConfigReducer(INITIAL_GRID_CONFIG, mockAction)).to.eql(
            expectResult,
        );
    });
});
