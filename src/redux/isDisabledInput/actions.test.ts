import chai from 'chai';
import { IsDisabledInputActionTypes } from './types';
import { disableInput, enableInput } from './actions';

describe('IsDisabledInputAction', () => {
    test('disableInput should return the correct action', () => {
        const expectedAction = {
            type: IsDisabledInputActionTypes.DISABLE_INPUT,
        };
        chai.expect(disableInput()).to.eql(expectedAction);
    });

    test('enableInput should return the correct action', () => {
        const expectedAction = {
            type: IsDisabledInputActionTypes.ENABLE_INPUT,
        };
        chai.expect(enableInput()).to.eql(expectedAction);
    });
});
