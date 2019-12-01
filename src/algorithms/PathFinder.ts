import { NodeData, GridPosition } from '../type/NodeData';
import { Deque } from '@blakeembrey/deque';
import PriorityQueue from 'tinyqueue';
import {
    QueueNode,
    queueNodeComparator,
    AStarQueueNode,
    aStarQueueNodeComparator,
} from './costFindingStrategies/types';
import { sleep } from '../utils';
import {
    ALGORITHM_GRID_UPDATE_TIMEOUT,
    WALL_VALUE,
    MAX_COST_VALUE,
    NEIGHBORS_DIRECTION,
} from '../constants/algorithms';
import { UpdateGridUIBooleanValue } from '../type/Function';
import { PathFinderBuilder } from './PathFinderBuilder';

export class PathFinder {
    private algorithmType: string;
    private rows: number;
    private cols: number;
    private grid: number[][];
    private cost: number[][];
    private updateGridUIIsVisted: UpdateGridUIBooleanValue;
    private updateGridUIIsPath: UpdateGridUIBooleanValue;
    private startPosition: GridPosition;
    private endPosition: GridPosition;

    public constructor(pathFinderBuilder: PathFinderBuilder) {
        this.algorithmType = pathFinderBuilder.algorithmType;
        this.rows = pathFinderBuilder.rows;
        this.cols = pathFinderBuilder.cols;
        this.updateGridUIIsPath = pathFinderBuilder.updateGridUIIsPath;
        this.updateGridUIIsVisted = pathFinderBuilder.updateGridUIIsVisted;
        this.grid = Array.from(Array(this.rows), () =>
            Array(this.cols).fill(0),
        );
        this.cost = Array.from(Array(this.rows), () =>
            Array(this.cols).fill(MAX_COST_VALUE),
        );
        this.startPosition = pathFinderBuilder.startPosition;
        this.endPosition = pathFinderBuilder.endPosition;
        this.fillGridWithNodesData(pathFinderBuilder.nodes);
    }

    private fillGridWithNodesData = (nodes: NodeData[]) => {
        nodes.forEach((node): void => {
            this.grid[node.rowIndex][node.colIndex] = node.isWall
                ? WALL_VALUE
                : node.weight;
        });
    };
}
