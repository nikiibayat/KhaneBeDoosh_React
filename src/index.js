import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from "react-router-dom"
import './index.css';

import Account from './Account/Account';
import HomePage from "./HomePage/Homepage";
import AddMelk from "./AddMelk/AddMelk";
import House from "./House/House"
import Search from "./Search/Search"

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact={true} path='/' component={HomePage}/>
            <Route path='/balance' component={Account} />
            <Route path='/houses' component={AddMelk} />
            <Route path='/Search' component={Search} />
            <Route path='/House' component={House} />
        </div>
    </BrowserRouter>,
    document.getElementById('root')
);


registerServiceWorker();
