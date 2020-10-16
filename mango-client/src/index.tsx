import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import './index.css';
import App from './App';

const rootElement = document.getElementById('root');

const contributors = ['woojoong.kim', 'subin.park']
const version = '1.0.0'

const store = configureStore();

render(
    <Provider store={store}>
        <App version={ `v${version}` }  contributor={ contributors } />
    </Provider>,
    rootElement
);
