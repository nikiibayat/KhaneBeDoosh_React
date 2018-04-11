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
            houses: ''
        };
        this.handleHouses = this.handleHouses.bind(this);
    }

    handleHouses(input) {
        this.setState({houses: input});
        console.log("here:" + input.houses[1].phone)
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact={true} path='/' render={() => <HomePage handleHouses={this.handleHouses}/>}/>
                    <Route path='/balance' component={Account}/>
                    <Route path='/addHouse' component={AddMelk}/>
                    <Route path='/search'
                           render={() => <Search houses={this.state.houses} handleHouses={this.handleHouses}/>}/>
                    <Route path='/house' component={House}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default Pages;