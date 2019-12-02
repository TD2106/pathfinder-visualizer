import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedApp from './App';
import { Provider } from 'react-redux';
import { store } from './redux';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>,
    document.getElementById('root'),
);
