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


        this.checkStatus = this.checkStatus.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            if( response.status === 403){
                console.log("Error 403 in recieving navbar info");
            }
            let error = new Error(response.statusText)
            error.response = response
            throw error
        }
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
            }
        })
            .then(this.checkStatus)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({name: data.individual.name});
                this.setState({balance: data.individual.balance});
            })
            .catch(function(error) {
                console.log('request failed', error);
            })
    }


    handleClick = () => {
        this.props.history.push("/balance");
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
                            <div className="row py-4 justify-content-center">
                                <button type="button" className="col-10 btn btn-click-me px-1 text-center text-light
                                khane-blue-background" onClick={this.handleClick}>
                                    افزایش اعتبار
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