import chai from 'chai';
import { getValueWithinRange } from './utils';

describe('utils', () => {
    test('getValueWithinRange should return the correct result', () => {
        const maxRange = 15;
        const minRange = 5;
        let value = 10;
        chai.expect(getValueWithinRange(value, minRange, maxRange)).to.equal(
            value,
        );
        value = 4;
        chai.expect(getValueWithinRange(value, minRange, maxRange)).to.equal(
            minRange,
        );
        value = 16;
        chai.expect(getValueWithinRange(value, minRange, maxRange)).to.equal(
            maxRange,
        );
    });
});
