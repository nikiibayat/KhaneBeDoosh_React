import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route} from 'react-router-dom'
import './index.css';

import Account from './Account/Account';
import HomePage from "./HomePage/Homepage";
import AddMelk from "./AddMelk/AddMelk";
import House from "./House/House"
import Search from "Search/Search"

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact={true} path='/' component={HomePage} />
            <Route path='/Account' component={Account} />
            <Route path='/AddHouse' component={AddMelk} />
            <Route path='/Search' component={Search} />
            <Route path='/House' component={House} />

        </div>
    </BrowserRouter>,
    document.getElementById('root')
);


registerServiceWorker();
