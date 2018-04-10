import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route} from 'react-router-dom'
import './index.css';

import Account from './Account/Account';
import HomePage from "./HomePage/Homepage";
import AddMelk from "./AddMelk/AddMelk";
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact={true} path='/' component={HomePage}/>
            <Route path='/Account' component={Account}/>
            <Route path='/AddHouse' component={AddMelk}/>
        </div>
    </BrowserRouter>,
    document.getElementById('root'));


registerServiceWorker();
