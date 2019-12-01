import { GridPosition } from '../type/NodeData';
import { WALL_VALUE, MAX_COST_VALUE } from '../constants/algorithms';

export const isAbleToEnterPosition = (
    position: GridPosition,
    grid: number[][],
    cost: number[][],
): boolean => {
    return (
        isValidPosition(position, grid) &&
        isNotWallNode(position, grid) &&
        isPositionUnVisted(position, cost)
    );
};

export const isValidPosition = (
    { rowIndex, colIndex }: GridPosition,
    grid: number[][],
): boolean => {
    return (
        rowIndex >= 0 &&
        rowIndex < grid.length &&
        colIndex >= 0 &&
        colIndex < grid[0].length
    );
};

export const isNotWallNode = (
    { rowIndex, colIndex }: GridPosition,
    grid: number[][],
): boolean => {
    return grid[rowIndex][colIndex] !== WALL_VALUE;
};

export const isPositionUnVisted = (
    { rowIndex, colIndex }: GridPosition,
    cost: number[][],
): boolean => {
    return cost[rowIndex][colIndex] === MAX_COST_VALUE;
};

export const createNextPosition = (
    currentPosition: GridPosition,
    [rowDirection, colDirection]: number[],
): GridPosition => {
    return {
        rowIndex: currentPosition.rowIndex + rowDirection,
        colIndex: currentPosition.colIndex + colDirection,
    };
};
