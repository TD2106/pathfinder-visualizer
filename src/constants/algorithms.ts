export const BFS = 'bfs';
export const DIJKSTRA = 'dijkstra';
export const ASTAR = 'astar';
export const ALGORITHM_GRID_UPDATE_TIMEOUT = 20;
export const WALL_VALUE = -1;
export const MAX_COST_VALUE = 2147483647;
export const NEIGHBORS_DIRECTION = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
];
export const MIN_LENGTH_FOR_RECURSIVE_DIVISION = 2;
export const HORIZONTAL_DIVISION = 0;
export const VERTICAL_DIVISION = 1;
export const MIN_NODE_WEIGHT = 1;
export const MAX_NODE_WEIGHT = 30;
export const ALGORITHM_OPTIONS = [
    {
        label: 'Breath first search',
        value: BFS,
    },
    {
        label: 'Dijkstra',
        value: DIJKSTRA,
    },
    {
        label: 'AStar',
        value: ASTAR,
    },
];
