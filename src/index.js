import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import registerServiceWorker from './registerServiceWorker';
import Pages from "./Pages";


ReactDOM.render(
    <Pages/>,
    document.getElementById('root')
);


registerServiceWorker();
