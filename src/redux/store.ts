import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { algorithmTypeReducer } from './algorithmType/reducer';
import { gridConfigReducer } from './gridConfig/reducer';
import { nodesReducer } from './nodes/reducer';

const rootReducer = combineReducers({
    algorithmType: algorithmTypeReducer,
    gridConfig: gridConfigReducer,
    nodes: nodesReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
