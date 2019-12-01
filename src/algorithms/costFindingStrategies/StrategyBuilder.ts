import { CostFindingStrategy } from './Strategy';
import { EMPTY_FUNCTION } from '../../constants/commonConstants';
import { UpdateGridUIBooleanValue } from '../../type/Function';
import { GridPosition } from '../../type/NodeData';
import { EMPTY_GRID_POSITION } from '../../constants/grid';
import { BFS, DIJKSTRA, ASTAR } from '../../constants/algorithms';
import { BfsStrategy } from './BfsStrategy';
import { DijkstraStrategy } from './DijkstraStrategy';
import { AStarStrategy } from './AStarStrategy';

export class CostFindingStrategyBuilder {
    private _grid: number[][] = [[]];
    private _cost: number[][] = [[]];
    private _updateGridUIIsVisited: UpdateGridUIBooleanValue = EMPTY_FUNCTION;
    private _startPosition: GridPosition = EMPTY_GRID_POSITION;
    private _endPosition: GridPosition = EMPTY_GRID_POSITION;

    public setGrid = (grid: number[][]): CostFindingStrategyBuilder => {
        this._grid = grid;
        return this;
    };

    public setCost = (cost: number[][]): CostFindingStrategyBuilder => {
        this._cost = cost;
        return this;
    };

    public setUpdateGridUIIsVisted = (
        updateGridUIIsVisted: UpdateGridUIBooleanValue,
    ): CostFindingStrategyBuilder => {
        this._updateGridUIIsVisited = updateGridUIIsVisted;
        return this;
    };

    public setStartPosition = (
        startPosition: GridPosition,
    ): CostFindingStrategyBuilder => {
        this._startPosition = startPosition;
        return this;
    };

    public setEndPosition = (
        endPosition: GridPosition,
    ): CostFindingStrategyBuilder => {
        this._endPosition = endPosition;
        return this;
    };

    public build = (algorithmType: string): CostFindingStrategy => {
        switch (algorithmType) {
            case BFS:
                return new BfsStrategy(this);
            case DIJKSTRA:
                return new DijkstraStrategy(this);
            case ASTAR:
                return new AStarStrategy(this);
            default:
                return new BfsStrategy(this);
        }
    };

    get grid(): number[][] {
        return this._grid;
    }

    get cost(): number[][] {
        return this._cost;
    }

    get updateGridUIIsVisited(): UpdateGridUIBooleanValue {
        return this._updateGridUIIsVisited;
    }

    get startPosition(): GridPosition {
        return this._startPosition;
    }

    get endPosition(): GridPosition {
        return this._endPosition;
    }
}
