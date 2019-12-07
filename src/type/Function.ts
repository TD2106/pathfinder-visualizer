import { AnyAction } from 'redux';

export type UpdateGridUIBooleanValue = (
    rowIndex: number,
    colIndex: number,
    value: boolean,
) => Promise<void>;

export type UpdateNodeUIActionCreator = (
    rowIndex: number,
    colIndex: number,
    value: boolean,
) => AnyAction;
