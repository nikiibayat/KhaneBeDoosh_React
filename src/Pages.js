import React from "react";
import HomePage from "./HomePage/Homepage";
import Account from "./Account/Account";
import AddMelk from "./AddMelk/AddMelk";
import Search from "./Search/Search";
import House from "./House/House";
import {BrowserRouter, Route} from "react-router-dom";

class Pages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        };
        this.handleData = this.handleData.bind(this);
    }

    handleData(input) {
        this.setState({data: input});
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact={true} path='/' render={() => <HomePage data={this.state.data} handleData={this.handleData}/>}/>
                    <Route path='/balance' component={Account}/>
                    <Route path='/houses' component={AddMelk}/>
                    <Route path='/Search' component={Search}/>
                    <Route path='/House' component={House}/>
                </div>
            </BrowserRouter>
        );
    }
}
export default Pages;