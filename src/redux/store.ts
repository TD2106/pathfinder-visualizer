import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { algorithmTypeReducer } from './algorithmType/reducer';
import { gridConfigReducer } from './gridConfig/reducer';

const rootReducer = combineReducers({
    algorithmType: algorithmTypeReducer,
    gridConfig: gridConfigReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
