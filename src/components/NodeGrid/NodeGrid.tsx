import React from 'react';
import { Node } from '../Node';
import './style.css';
import { GridConfig, ReduxStore } from '../../type/ReduxStore';
import { NodeData } from '../../type/NodeData';
import { connect } from 'react-redux';
import { DIJKSTRA } from '../../constants/algorithms';

interface ReduxStateProps {
    gridConfig: GridConfig;
    nodes: NodeData[];
    algorithmType: string;
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
                        isDisplayWeight={props.algorithmType === DIJKSTRA}
                    />
                );
            },
        );
    };
    return (
        <div
            className={NODE_GRID_CLASS}
            style={{
                gridTemplateColumns: `repeat(${props.gridConfig.cols}, 25px)`,
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
    };
};

export default connect<ReduxStateProps, {}, {}, ReduxStore>(mapStateToProps)(
    NodeGrid,
);
