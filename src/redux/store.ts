import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { algorithmTypeReducer } from './algorithmType/reducer';
import { gridConfigReducer } from './gridConfig/reducer';
import { nodesReducer } from './nodes/reducer';
import { gridMarkedPositionReducer } from './gridMarkedPosition/reducer';
import { isDisabledInputReducer } from './isDisabledInput/reducer';

const rootReducer = combineReducers({
    algorithmType: algorithmTypeReducer,
    gridConfig: gridConfigReducer,
    nodes: nodesReducer,
    gridMarkedPosition: gridMarkedPositionReducer,
    isDisabledInput: isDisabledInputReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
