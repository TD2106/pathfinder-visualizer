import chai from 'chai';
import { isDisabledInputReducer } from './reducer';
import { disableInput, enableInput } from './actions';
import { INITIAL_IS_DISABLED_INPUT } from '../../constants/ReduxStore';

describe('algorithmTypeReducer', () => {
    test('disableInput should return true if the action is disableInput', () => {
        const expectResult = true;
        chai.expect(
            isDisabledInputReducer(INITIAL_IS_DISABLED_INPUT, disableInput()),
        ).to.equal(expectResult);
    });

    test('disableInput should return false if the action is enableInput', () => {
        const expectResult = false;
        chai.expect(
            isDisabledInputReducer(INITIAL_IS_DISABLED_INPUT, enableInput()),
        ).to.equal(expectResult);
    });
});
