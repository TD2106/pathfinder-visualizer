import { EMPTY_ASYNC_FUNCTION } from '../constants/commonConstants';
import { UpdateGridUIBooleanValue } from '../type/Function';
import { GridPosition } from '../type/NodeData';
import { EMPTY_GRID_POSITION } from '../constants/grid';
import { MazeGenerator } from './MazeGenerator';

export class MazeGeneratorBuilder {
    private _rows = 0;
    private _cols = 0;
    private _updateGridUIIsWall: UpdateGridUIBooleanValue = EMPTY_ASYNC_FUNCTION;
    private _startPosition: GridPosition = EMPTY_GRID_POSITION;
    private _endPosition: GridPosition = EMPTY_GRID_POSITION;

    public setRows = (rows: number): MazeGeneratorBuilder => {
        this._rows = rows;
        return this;
    };

    public setCols = (cols: number): MazeGeneratorBuilder => {
        this._cols = cols;
        return this;
    };

    public setUpdateGridUIIsWall = (
        updateGridUIIsWall: UpdateGridUIBooleanValue,
    ): MazeGeneratorBuilder => {
        this._updateGridUIIsWall = updateGridUIIsWall;
        return this;
    };

    public setStartPosition = (
        startPosition: GridPosition,
    ): MazeGeneratorBuilder => {
        this._startPosition = startPosition;
        return this;
    };

    public setEndPosition = (
        endPosition: GridPosition,
    ): MazeGeneratorBuilder => {
        this._endPosition = endPosition;
        return this;
    };

    public build = (): MazeGenerator => {
        return new MazeGenerator(this);
    };

    get rows(): number {
        return this._rows;
    }

    get cols(): number {
        return this._cols;
    }

    get updateGridUIIsWall(): UpdateGridUIBooleanValue {
        return this._updateGridUIIsWall;
    }

    get startPosition(): GridPosition {
        return this._startPosition;
    }

    get endPosition(): GridPosition {
        return this._endPosition;
    }
}
