import { GridPosition, NodeData } from '../../type/NodeData';
import { generateRandomIntegerInRange } from '../../utils';
import { GridMarkedPosition } from '../../type/ReduxStore';
import { cloneDeep, isEqual } from 'lodash';

export const createNewInitialNodesData = (
    rows: number,
    cols: number,
): NodeData[] => {
    const nodes: NodeData[] = [];
    for (let rowIndex = 0; rowIndex < rows; rowIndex += 1) {
        for (let colIndex = 0; colIndex < cols; colIndex += 1) {
            nodes.push(createInitialNodeData(rowIndex, colIndex));
        }
    }
    return nodes;
};

const createInitialNodeData = (
    rowIndex: number,
    colIndex: number,
): NodeData => {
    return {
        rowIndex,
        colIndex,
        weight: 1,
        isPath: false,
        isVisited: false,
        isWall: false,
    };
};

export const createRandomGridMarkedPosition = (
    rows: number,
    cols: number,
): GridMarkedPosition => {
    const startPosition = generateRandomPosition(rows, cols);
    let endPosition = cloneDeep(startPosition);
    while (isEqual(endPosition, startPosition)) {
        endPosition = generateRandomPosition(rows, cols);
    }
    const gridMarkedPosition: GridMarkedPosition = {
        start: startPosition,
        end: endPosition,
    };
    return gridMarkedPosition;
};

const generateRandomPosition = (rows: number, cols: number): GridPosition => {
    return {
        rowIndex: generateRandomIntegerInRange(0, rows - 1),
        colIndex: generateRandomIntegerInRange(0, cols - 1),
    };
};
