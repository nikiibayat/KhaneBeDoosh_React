import React from "react";
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css';
import '../shared-styles.css';
import '../reset.css';
import 'whatwg-fetch';
import {withRouter} from "react-router-dom";
import PersianNumber from '../components/PersianNumber'

class NavBarDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            balance: ''
        };


        this.handleClick = this.handleClick.bind(this);

    }

    componentDidMount(){
        let url = 'http://localhost:8080/users/';

        let authorizationHeader ;
        if(localStorage.getItem("access_token") === "null"){
            authorizationHeader = "Bearer ";
        }
        else{
            authorizationHeader = "Bearer " + localStorage.getItem("access_token");
        }

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization' : authorizationHeader,
                'content_type' : 'application/json',
                'Accept' : 'application/json',
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({name: data.individual.name});
                this.setState({balance: data.individual.balance});
            })
            .catch(function(error) {
                console.log('request failed in Navbar DropDown', error);
            })
    }


    handleClick = () => {
        this.props.history.push("/balance");
    };

    handleExit = () => {
        localStorage.setItem('access_token',null);
        this.props.history.push("/login");
    };

    render() {
        return (
            <div className="navbar-nav dropdown">
                <div className="nav-item nav-link">
                    <div className="shabnam nav-profile-purple"><i className="fa fa-smile-o fa-lg"></i> ناحیه‌ی کاربری
                    </div>
                    <div className="dropdown-content shabnam dropdown-responsive pt-4">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="text-dark h5">{this.state.name}</div>
                            </div>
                            <div className="row py-3 grey-color">
                                <div className="col-5 px-0 text-right">اعتبار</div>
                                <div className="col-7 px-0 text-left"><PersianNumber number={this.state.balance}/> تومان</div>
                            </div>
                            <div className="row justify-content-center">
                                <button type="button" className="col-10 btn btn-click-me px-1 text-center text-light
                                khane-blue-background" onClick={this.handleClick}>
                                    افزایش اعتبار
                                </button>
                            </div>
                            <div className="row py-4 justify-content-center">
                                <button type="button" className="col-10 btn btn-click-me px-1 text-center text-light
                                text-dark btn-border" onClick={this.handleExit}>
                                    خروج
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(NavBarDropdown);