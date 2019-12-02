import { MazeGeneratorBuilder } from './MazeGeneratorBuilder';
import { UpdateGridUIBooleanValue } from '../type/Function';
import { GridPosition } from '../type/NodeData';
import {
    MIN_LENGTH_FOR_RECURSIVE_DIVISION,
    VERTICAL_DIVISION,
    HORIZONTAL_DIVISION,
    ALGORITHM_GRID_UPDATE_TIMEOUT,
} from '../constants/algorithms';
import { generateRandomIntegerInRange, sleep } from '../utils';

export class MazeGenerator {
    private rows: number;
    private cols: number;
    private updateGridUIIsWall: UpdateGridUIBooleanValue;
    private startPosition: GridPosition;
    private endPosition: GridPosition;

    public constructor(mazeGeneratorBuilder: MazeGeneratorBuilder) {
        this.rows = mazeGeneratorBuilder.rows;
        this.cols = mazeGeneratorBuilder.cols;
        this.updateGridUIIsWall = mazeGeneratorBuilder.updateGridUIIsWall;
        this.startPosition = mazeGeneratorBuilder.startPosition;
        this.endPosition = mazeGeneratorBuilder.endPosition;
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
            rowLength >= MIN_LENGTH_FOR_RECURSIVE_DIVISION &&
            colLength >= MIN_LENGTH_FOR_RECURSIVE_DIVISION
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
        const divideRow = generateRandomIntegerInRange(startingRow, endingRow);
        const blankColIndex = generateRandomIntegerInRange(
            startingCol,
            endingCol,
        );
        for (let colIndex = startingCol; colIndex <= endingCol; colIndex += 1) {
            if (
                colIndex !== blankColIndex &&
                this.isPositionNotStartOrEndPosition(divideRow, colIndex)
            ) {
                this.updateGridUIIsWall(divideRow, colIndex, true);
                await sleep(ALGORITHM_GRID_UPDATE_TIMEOUT);
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
        const divideCol = generateRandomIntegerInRange(startingCol, endingCol);
        const blankRowIndex = generateRandomIntegerInRange(
            startingRow,
            endingRow,
        );
        for (let rowIndex = startingCol; rowIndex <= endingRow; rowIndex += 1) {
            if (
                rowIndex !== blankRowIndex &&
                this.isPositionNotStartOrEndPosition(rowIndex, divideCol)
            ) {
                this.updateGridUIIsWall(rowIndex, divideCol, true);
                await sleep(ALGORITHM_GRID_UPDATE_TIMEOUT);
            }
        }
        return divideCol;
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
}
