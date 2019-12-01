import chai from 'chai';
import {
    isAbleToEnterPosition,
    isNotWallNode,
    isPositionUnVisted,
    isValidPosition,
    createNextPosition,
} from './algorithmUtils';
import { MAX_COST_VALUE, WALL_VALUE } from '../constants/algorithms';

const MOCK_GRID = [
    [1, WALL_VALUE],
    [1, 2],
];
const MOCK_COST = [
    [0, MAX_COST_VALUE],
    [0, MAX_COST_VALUE],
];

describe('algorithmUtils', () => {
    test('isValidPosition should return false when rowIndex or colIndex is out of bound', () => {
        let rowIndex = -1;
        let colIndex = 0;
        chai.expect(isValidPosition({ rowIndex, colIndex }, MOCK_GRID)).to.be
            .false;
        rowIndex = 0;
        colIndex = -1;
        chai.expect(isValidPosition({ rowIndex, colIndex }, MOCK_GRID)).to.be
            .false;
        rowIndex = 0;
        colIndex = 2;
        chai.expect(isValidPosition({ rowIndex, colIndex }, MOCK_GRID)).to.be
            .false;
        rowIndex = 2;
        colIndex = 0;
        chai.expect(isValidPosition({ rowIndex, colIndex }, MOCK_GRID)).to.be
            .false;
    });

    test('isValidPosition should return true when rowIndex or colIndex is in bound', () => {
        let rowIndex = 1;
        let colIndex = 1;
        chai.expect(isValidPosition({ rowIndex, colIndex }, MOCK_GRID)).to.be
            .true;
        rowIndex = 0;
        colIndex = 1;
        chai.expect(isValidPosition({ rowIndex, colIndex }, MOCK_GRID)).to.be
            .true;
    });

    test('isNotWallNode should return the correct result', () => {
        let rowIndex = 1;
        let colIndex = 1;
        chai.expect(isNotWallNode({ rowIndex, colIndex }, MOCK_GRID)).to.be
            .true;
        rowIndex = 0;
        colIndex = 1;
        chai.expect(isNotWallNode({ rowIndex, colIndex }, MOCK_GRID)).to.be
            .false;
    });

    test('isPositionUnVisted should return the correct result', () => {
        let rowIndex = 1;
        let colIndex = 1;
        chai.expect(isPositionUnVisted({ rowIndex, colIndex }, MOCK_COST)).to.be
            .true;
        rowIndex = 0;
        colIndex = 0;
        chai.expect(isPositionUnVisted({ rowIndex, colIndex }, MOCK_COST)).to.be
            .false;
    });

    test('isAbleToEnterPosition should return the correct result', () => {
        let rowIndex = 1;
        let colIndex = 1;
        chai.expect(
            isAbleToEnterPosition({ rowIndex, colIndex }, MOCK_GRID, MOCK_COST),
        ).to.be.true;
        rowIndex = 0;
        colIndex = 0;
        chai.expect(
            isAbleToEnterPosition({ rowIndex, colIndex }, MOCK_GRID, MOCK_COST),
        ).to.be.false;
        rowIndex = 0;
        colIndex = 1;
        chai.expect(
            isAbleToEnterPosition({ rowIndex, colIndex }, MOCK_GRID, MOCK_COST),
        ).to.be.false;
        rowIndex = -1;
        colIndex = 1;
        chai.expect(
            isAbleToEnterPosition({ rowIndex, colIndex }, MOCK_GRID, MOCK_COST),
        ).to.be.false;
    });

    test('createNextPosition should return the correct result', () => {});
});
