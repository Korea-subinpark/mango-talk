import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const rootElement = document.getElementById("root");

const contributors = ["woojoong.kim", "subin.park"]
const version = "1.0.0"

ReactDOM.render(
    <React.StrictMode>
        <App version={ `v${version}` }  contributor={ contributors } />
    </React.StrictMode>,
    rootElement
);
