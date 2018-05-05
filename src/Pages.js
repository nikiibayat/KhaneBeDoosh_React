import React from "react";
import HomePage from "./HomePage/Homepage";
import Account from "./Account/Account";
import AddMelk from "./AddMelk/AddMelk";
import Search from "./Search/Search";
import House from "./House/House";
import Login from "./Login/Login"
import {BrowserRouter, Route} from "react-router-dom";

class Pages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            houses: ''
        };
        this.handleHouses = this.handleHouses.bind(this);
        this.handleID = this.handleID.bind(this);
    }

    handleHouses(input) {
        this.setState({houses: input});
    }
    handleID(houseID){
        this.setState({id: houseID})
    }


    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact={true} path='/' render={() => <HomePage handleHouses={this.handleHouses}/>}/>
                    <Route path='/balance' component={Account}/>
                    <Route path='/addHouse' component={AddMelk}/>
                    <Route path='/search'
                           render={() => <Search houses={this.state.houses} handleHouses={this.handleHouses} handleID={this.handleID}/>}/>
                    <Route path='/house' render={() => <House id={this.state.id}/>}/>
                    <Route path='/login' component={Login}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default Pages;