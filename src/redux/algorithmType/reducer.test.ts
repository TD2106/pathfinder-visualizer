import chai from 'chai';
import { algorithmTypeReducer } from './reducer';
import { updateAlgorithmType } from './actions';
import { DIJKSTRA, BFS } from '../../constants/algorithms';
import { AnyAction } from 'redux';

describe('algorithmTypeReducer', () => {
    test('algorithmTypeReducer should return the correct state if the action is update algorithm type', () => {
        const expectResult = DIJKSTRA;
        chai.expect(
            algorithmTypeReducer(BFS, updateAlgorithmType(DIJKSTRA)),
        ).to.equal(expectResult);
    });

    test('algorithmTypeReducer should return the initial state if it is a random action', () => {
        const expectResult = BFS;
        const mockAction: AnyAction = { type: 'random' };
        chai.expect(algorithmTypeReducer(BFS, mockAction)).to.equal(
            expectResult,
        );
    });
});
