import { PathFinder } from './PathFinder';
import {
    BLANK_STRING,
    EMPTY_ASYNC_FUNCTION,
} from '../constants/commonConstants';
import { UpdateGridUIBooleanValue } from '../type/Function';
import { GridPosition, NodeData } from '../type/NodeData';
import { EMPTY_GRID_POSITION } from '../constants/grid';

export class PathFinderBuilder {
    private _algorithmType: string = BLANK_STRING;
    private _rows = 0;
    private _cols = 0;
    private _nodes: NodeData[] = [];
    private _updateGridUIIsVisted: UpdateGridUIBooleanValue = EMPTY_ASYNC_FUNCTION;
    private _updateGridUIIsPath: UpdateGridUIBooleanValue = EMPTY_ASYNC_FUNCTION;
    private _startPosition: GridPosition = EMPTY_GRID_POSITION;
    private _endPosition: GridPosition = EMPTY_GRID_POSITION;

    public setAlgorithmType = (algorithmType: string): PathFinderBuilder => {
        this._algorithmType = algorithmType;
        return this;
    };

    public setRows = (rows: number): PathFinderBuilder => {
        this._rows = rows;
        return this;
    };

    public setCols = (cols: number): PathFinderBuilder => {
        this._cols = cols;
        return this;
    };

    public setNodes = (nodes: NodeData[]): PathFinderBuilder => {
        this._nodes = nodes;
        return this;
    };

    public setUpdateGridUIIsVisted = (
        updateGridUIIsVisted: UpdateGridUIBooleanValue,
    ): PathFinderBuilder => {
        this._updateGridUIIsVisted = updateGridUIIsVisted;
        return this;
    };

    public setUpdateGridUIIsPath = (
        updateGridUIIsPath: UpdateGridUIBooleanValue,
    ): PathFinderBuilder => {
        this._updateGridUIIsPath = updateGridUIIsPath;
        return this;
    };

    public setStartPosition = (
        startPosition: GridPosition,
    ): PathFinderBuilder => {
        this._startPosition = startPosition;
        return this;
    };

    public setEndPosition = (endPosition: GridPosition): PathFinderBuilder => {
        this._endPosition = endPosition;
        return this;
    };

    public build = (): PathFinder => {
        return new PathFinder(this);
    };

    get algorithmType(): string {
        return this._algorithmType;
    }

    get rows(): number {
        return this._rows;
    }

    get cols(): number {
        return this._cols;
    }

    get nodes(): NodeData[] {
        return this._nodes;
    }

    get updateGridUIIsVisted(): UpdateGridUIBooleanValue {
        return this._updateGridUIIsVisted;
    }

    get updateGridUIIsPath(): UpdateGridUIBooleanValue {
        return this._updateGridUIIsPath;
    }

    get startPosition(): GridPosition {
        return this._startPosition;
    }

    get endPosition(): GridPosition {
        return this._endPosition;
    }
}
