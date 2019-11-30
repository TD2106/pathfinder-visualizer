import React from 'react';
import { Node } from '../Node';
import './style.css';

const NODE_GRID_CLASS = 'node-grid';

export const NodeGrid = (): JSX.Element => {
    const nodes: JSX.Element[] = [];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            nodes.push(<Node />);
        }
    }
    return (
        <div
            className={NODE_GRID_CLASS}
            style={{ gridTemplateColumns: `repeat(10, 1fr)` }}
        >
            {nodes}
        </div>
    );
};
