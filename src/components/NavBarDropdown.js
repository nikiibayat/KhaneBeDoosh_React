import React from "react";
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css';
import '../shared-styles.css';
import '../reset.css';
import 'whatwg-fetch';
import {Link} from 'react-router-dom';

class NavBarDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            balance: ''
        }


        this.checkStatus = this.checkStatus.bind(this);

    }

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }

    componentDidMount(){
        let url = 'http://localhost:8080/users?username=behnamhomayoon';
        fetch( url , {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(this.checkStatus)
            .then(response => {return response.json();})
            .then(data => {
                this.setState({name: data.individual.name});
                this.setState({balance: data.individual.balance});
            })
            .catch(function(error) {
            console.log('request failed', error);
        })



    }

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
                                <div className="col-7 px-0 text-left">{this.state.balance} تومان</div>
                            </div>
                            <Link to='/balance'>
                                <div className="row py-4 justify-content-center">
                                    <button type="button" className="col-10 btn btn-click-me px-1 text-center text-light
                                khane-blue-background" onClick={this.IncreaseBalance}>افزایش اعتبار
                                    </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavBarDropdown;