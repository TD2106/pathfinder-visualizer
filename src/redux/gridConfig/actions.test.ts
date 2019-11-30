import chai from 'chai';
import { GridConfigActionTypes } from './types';
import { updateGridConfig } from './actions';

describe('GridConfigAction', () => {
    test('updateGridConfig should return the correct action', () => {
        const mockRows = 10;
        const mockCols = 20;
        const expectedAction = {
            type: GridConfigActionTypes.UPDATE_GRID_CONFIG,
            payload: { rows: mockRows, cols: mockCols },
        };
        chai.expect(updateGridConfig(mockRows, mockCols)).to.eql(
            expectedAction,
        );
    });
});
