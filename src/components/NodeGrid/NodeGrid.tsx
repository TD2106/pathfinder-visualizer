import React from 'react';
import { Node } from '../Node';
import './style.css';
import {
    GridConfig,
    ReduxStore,
    GridMarkedPosition,
} from '../../type/ReduxStore';
import { NodeData } from '../../type/NodeData';
import { connect } from 'react-redux';
import { DIJKSTRA } from '../../constants/algorithms';
import { isSamePosition } from '../../utils';

interface ReduxStateProps {
    gridConfig: GridConfig;
    nodes: NodeData[];
    algorithmType: string;
    gridMarkedPosition: GridMarkedPosition;
}

type Props = ReduxStateProps;

const NODE_GRID_CLASS = 'node-grid';

export const NodeGrid = (props: Props): JSX.Element => {
    const getNodeElements = (): JSX.Element[] => {
        return props.nodes.map(
            (nodeData): JSX.Element => {
                const nodeKey = createKeyForNodeElement(
                    nodeData.rowIndex,
                    nodeData.colIndex,
                );
                return (
                    <Node
                        key={nodeKey}
                        nodeData={nodeData}
                        isDisplayWeight={
                            props.algorithmType === DIJKSTRA && !nodeData.isWall
                        }
                        isStart={isSamePosition(
                            nodeData,
                            props.gridMarkedPosition.start,
                        )}
                        isEnd={isSamePosition(
                            nodeData,
                            props.gridMarkedPosition.end,
                        )}
                    />
                );
            },
        );
    };
    return (
        <div
            className={NODE_GRID_CLASS}
            style={{
                gridTemplateColumns: `repeat(${props.gridConfig.cols}, 26px)`,
            }}
        >
            {getNodeElements()}
        </div>
    );
};

const createKeyForNodeElement = (
    rowIndex: number,
    colIndex: number,
): string => {
    return `row${rowIndex}col${colIndex}`;
};

const mapStateToProps = (state: ReduxStore): ReduxStateProps => {
    return {
        gridConfig: state.gridConfig,
        nodes: state.nodes,
        algorithmType: state.algorithmType,
        gridMarkedPosition: state.gridMarkedPosition,
    };
};

export default connect<ReduxStateProps, {}, {}, ReduxStore>(mapStateToProps)(
    NodeGrid,
);
