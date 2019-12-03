import chai from 'chai';
import { getValueWithinRange, generateRandomIntegerInRange, isSamePosition } from './utils';

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

    test('genrateRandomIntegerInRange should return a random integer within range', () => {
        for (let i = 0; i < 100; i++) {
            const start = i,
                end = i + 10;
            const randomInt = generateRandomIntegerInRange(start, end);
            chai.expect(randomInt >= start).to.be.true;
            chai.expect(randomInt <= end).to.be.true;
        }
    });

    test('isSamePosition should return the correct result', () => {
        let firstPosition = {rowIndex: 10, colIndex: 10};
        let secondPosition = {rowIndex: 10, colIndex: 10};
        chai.expect(isSamePosition(firstPosition, secondPosition)).to.be.true;
        secondPosition.rowIndex = 1;
        chai.expect(isSamePosition(firstPosition, secondPosition)).to.be.false;
    })
});
