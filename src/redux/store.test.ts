import chai from 'chai';
import { store } from './store';
import { INITIAL_REDUX_STORE_STATE } from '../constants/ReduxStore';

describe('Redux root store', () => {
    test('root store should have the correct initial state', () => {
        chai.expect(store.getState()).to.eql(INITIAL_REDUX_STORE_STATE);
    });
});
