import chai from 'chai';
import { AlgorithmTypeActionTypes } from './types';
import { updateAlgorithmType } from './actions';
import { BFS } from '../../constants/algorithms';

describe('AlgorithmTypeAction', () => {
    test('updateAlgorithmType should return the correct action', () => {
        const expectedAction = {
            type: AlgorithmTypeActionTypes.UPDATE_ALGORITHM_TYPE,
            payload: BFS,
        };
        chai.expect(updateAlgorithmType(BFS)).to.eql(expectedAction);
    });
});
