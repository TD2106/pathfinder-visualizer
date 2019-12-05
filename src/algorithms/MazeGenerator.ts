import { MazeGeneratorBuilder } from './MazeGeneratorBuilder';
import { UpdateGridUIBooleanValue } from '../type/Function';
import { GridPosition } from '../type/NodeData';
import {
    MIN_LENGTH_FOR_RECURSIVE_DIVISION,
    VERTICAL_DIVISION,
    HORIZONTAL_DIVISION,
    ALGORITHM_GRID_UPDATE_TIMEOUT,
} from '../constants/algorithms';
import {
    generateRandomIntegerInRange,
    sleep,
    getValueWithinRange,
} from '../utils';

export class MazeGenerator {
    private rows: number;
    private cols: number;
    private updateGridUIIsWall: UpdateGridUIBooleanValue;
    private startPosition: GridPosition;
    private endPosition: GridPosition;
    private wallNodeKeySet: Set<string>;

    public constructor(mazeGeneratorBuilder: MazeGeneratorBuilder) {
        this.rows = mazeGeneratorBuilder.rows;
        this.cols = mazeGeneratorBuilder.cols;
        this.updateGridUIIsWall = mazeGeneratorBuilder.updateGridUIIsWall;
        this.startPosition = mazeGeneratorBuilder.startPosition;
        this.endPosition = mazeGeneratorBuilder.endPosition;
        this.wallNodeKeySet = new Set();
    }

    public constructMaze = async (): Promise<void> => {
        await this.recursiveDivision(0, this.rows - 1, 0, this.cols - 1);
    };

    private recursiveDivision = async (
        startingRow: number,
        endingRow: number,
        startingCol: number,
        endingCol: number,
    ): Promise<void> => {
        const rowLength = this.getRangeBetweenTwoValue(startingRow, endingRow);
        const colLength = this.getRangeBetweenTwoValue(startingCol, endingCol);
        if (
            rowLength > MIN_LENGTH_FOR_RECURSIVE_DIVISION &&
            colLength > MIN_LENGTH_FOR_RECURSIVE_DIVISION
        ) {
            const orientation = this.chooseOrientation(rowLength, colLength);
            if (orientation === HORIZONTAL_DIVISION) {
                const divideRow = await this.divideGridHorizontally(
                    startingRow,
                    endingRow,
                    startingCol,
                    endingCol,
                );
                await this.recursiveDivision(
                    startingRow,
                    divideRow - 1,
                    startingCol,
                    endingCol,
                );
                await this.recursiveDivision(
                    divideRow + 1,
                    endingRow,
                    startingCol,
                    endingCol,
                );
            } else {
                const divideCol = await this.divideGridVertically(
                    startingRow,
                    endingRow,
                    startingCol,
                    endingCol,
                );
                await this.recursiveDivision(
                    startingRow,
                    endingRow,
                    startingCol,
                    divideCol - 1,
                );
                await this.recursiveDivision(
                    startingRow,
                    endingRow,
                    divideCol + 1,
                    endingCol,
                );
            }
        }
    };

    private getRangeBetweenTwoValue = (
        lowerValue: number,
        upperValue: number,
    ): number => {
        return upperValue - lowerValue + 1;
    };

    private chooseOrientation = (
        rowLength: number,
        colLength: number,
    ): number => {
        if (rowLength < colLength) {
            return VERTICAL_DIVISION;
        } else if (rowLength > colLength) {
            return HORIZONTAL_DIVISION;
        } else {
            return generateRandomIntegerInRange(0, 1) % 2 === 0
                ? HORIZONTAL_DIVISION
                : VERTICAL_DIVISION;
        }
    };

    private divideGridHorizontally = async (
        startingRow: number,
        endingRow: number,
        startingCol: number,
        endingCol: number,
    ): Promise<number> => {
        const divideRow = this.getMiddleValueInRange(startingRow, endingRow);
        let blankColIndex = generateRandomIntegerInRange(
            startingCol + 1,
            endingCol - 1,
        );
        const start =
            startingCol - 1 < 0 ||
            this.wallNodeKeySet.has(this.createNodeKey(divideRow, startingCol))
                ? startingCol
                : startingCol + 1;
        const end =
            endingCol + 1 === this.cols ||
            this.wallNodeKeySet.has(this.createNodeKey(divideRow, endingCol))
                ? endingCol
                : endingCol - 1;
        blankColIndex =
            start === startingCol && end === endingCol ? blankColIndex : -1;
        for (let colIndex = start; colIndex <= end; colIndex += 1) {
            if (!this.isPositionNotStartOrEndPosition(divideRow, colIndex)) {
                blankColIndex = -1;
            }
        }
        for (let colIndex = start; colIndex <= end; colIndex += 1) {
            if (
                colIndex !== blankColIndex &&
                this.isPositionNotStartOrEndPosition(divideRow, colIndex)
            ) {
                await this.updateIsWallAndSleep(divideRow, colIndex);
            }
        }
        return divideRow;
    };

    private divideGridVertically = async (
        startingRow: number,
        endingRow: number,
        startingCol: number,
        endingCol: number,
    ): Promise<number> => {
        const divideCol = this.getMiddleValueInRange(startingCol, endingCol);
        let blankRowIndex = generateRandomIntegerInRange(
            startingRow + 1,
            endingRow - 1,
        );
        const start =
            startingRow - 1 < 0 ||
            this.wallNodeKeySet.has(this.createNodeKey(startingRow, divideCol))
                ? startingRow
                : startingRow + 1;
        const end =
            endingRow + 1 === this.rows ||
            this.wallNodeKeySet.has(this.createNodeKey(endingRow, divideCol))
                ? endingRow
                : endingRow - 1;
        blankRowIndex =
            start === startingRow && end === endingRow ? blankRowIndex : -1;
        for (let rowIndex = start; rowIndex <= end; rowIndex += 1) {
            if (!this.isPositionNotStartOrEndPosition(rowIndex, divideCol)) {
                blankRowIndex = -1;
            }
        }
        for (let rowIndex = start; rowIndex <= end; rowIndex += 1) {
            if (
                rowIndex !== blankRowIndex &&
                this.isPositionNotStartOrEndPosition(rowIndex, divideCol)
            ) {
                await this.updateIsWallAndSleep(rowIndex, divideCol);
            }
        }
        return divideCol;
    };

    private getMiddleValueInRange = (
        startRange: number,
        endRange: number,
    ): number => {
        return getValueWithinRange(
            Math.floor((endRange + startRange) / 2) +
                generateRandomIntegerInRange(0, 2),
            startRange,
            endRange,
        );
    };

    private isPositionNotStartOrEndPosition = (
        rowIndex: number,
        colIndex: number,
    ): boolean => {
        return (
            (rowIndex !== this.startPosition.rowIndex ||
                colIndex !== this.startPosition.colIndex) &&
            (rowIndex !== this.endPosition.rowIndex ||
                colIndex !== this.endPosition.colIndex)
        );
    };

    private async updateIsWallAndSleep(rowIndex: number, colIndex: number) {
        this.updateGridUIIsWall(rowIndex, colIndex, true);
        this.wallNodeKeySet.add(this.createNodeKey(rowIndex, colIndex));
        await sleep(ALGORITHM_GRID_UPDATE_TIMEOUT);
    }

    private createNodeKey = (rowIndex: number, colIndex: number): string => {
        return `r${rowIndex}c${colIndex}`;
    };
}
