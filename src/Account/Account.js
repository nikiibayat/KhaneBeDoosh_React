import React from 'react';
import 'whatwg-fetch';
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import twitter from '../assets/icons/Twitter_bird_logo_2012.svg.png';
import telegram from '../assets/icons/200px-Telegram_logo.svg.png';
import instagram from '../assets/icons/200px-Instagram_logo_2016.svg.png';
import './Account.css';
import '../shared-styles.css';
import '../reset.css';
import {Link} from 'react-router-dom';
import NavBarDropdown from '../components/NavBarDropdown';
import NavBarLogoLink from "../components/NavBarLogoLink";
import PageTitleHeader from "../components/PageTitleHeader";

import DocumentTitle from 'react-document-title'
import URLSearchParams from 'url-search-params';
import PersianNumber from "../components/PersianNumber";


class Account extends React.Component {
    render() {
        return (
            <DocumentTitle title='افزایش موجودی'>
                <div>
                    <NavBar/>
                    <PageTitleHeader text={"افزایش موجودی"}/>
                    <IncreaseBalance/>
                    <Footer/>
                </div>
            </DocumentTitle>
        );
    }
}

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: 'false'
        }
    }

    componentDidMount(){
        let url = 'http://localhost:8080/users?username=behnamhomayoon';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authentication' : 'Bearer ' + window.sessionStorage.accessToken
            }
        })
            .then(function () {
                this.setState({isLoggedIn : 'true'});
            })
            .catch(error => {
                this.setState({isLoggedIn : 'false'});
                console.log('request failed', error);
            })
    }
    render () {
        return (
            <nav className="navbar fixed-top navbar-light bg-white rtl shadow">
                <NavBarLogoLink/>
                {(this.state.isLoggedIn === "false") ? (
                    <Link to="/login">
                        <button type="button"
                                className="btn btn-sm text-center text-light khane-blue-background shabnam ">ورود
                        </button>
                    </Link> ) : (
                    <NavBarDropdown color={"purple"}/>
                )}
            </nav>
        );
    }
}

class IncreaseBalance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance : '۰',
            success: 'true',
            isLoggedIn: '',
            errMessage: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(input){

        const searchParams = new URLSearchParams();
        searchParams.set('balance', Number(input));

        let authorizationHeader ;
        if(localStorage.getItem("access_token") === "null"){
            authorizationHeader = "Bearer ";
        }
        else{
            authorizationHeader = 'Bearer ' + localStorage.getItem("access_token");
        }

        fetch('http://localhost:8080/balance', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization' : authorizationHeader
            },
            body : searchParams
        })
            .then(response => {
                this.setState({errMessage : ''});
                return response.json();
            })
            .then(data => {
                let newBalance = Number(this.state.balance) + Number(input);
                this.setState({balance : newBalance});
            })
            .catch(error => {
                this.setState({errMessage : 'برای افزایش اعتبار حتما باید وارد شوید!'});
                console.log('request failed to increase balance', error);
            })
    }


    componentDidMount(){
        let url = 'http://localhost:8080/users/';

        let authorizationHeader ;
        if(localStorage.getItem("access_token") === "null"){
            authorizationHeader = "Bearer ";
        }
        else{
            authorizationHeader = 'Bearer ' + localStorage.getItem("access_token");
        }
        console.log("sent JWT content is : " + authorizationHeader);

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization' : authorizationHeader,
            }
        })
            .then(function () {
                this.setState({isLoggedIn : 'true'});
            })
            .catch(error => {
                this.setState({isLoggedIn : 'false'});
                console.log('request failed', error);
            })
    }

    render() {
        return (
            <div className="container">
                <div className="row rtl shabnam">
                    <div className="col-12 col-md-6 text-right balance grey-color font-weight-light ">
                        <CurrentBalance balance={this.state.balance}/>
                    </div>
                    <div className="col-12 col-md-6 input inputInc py-5">
                        <Increase handleClick={this.handleSubmit} success={this.state.success} isLoggedIn={this.state.isLoggedIn} errMessage={this.state.errMessage}/>
                    </div>
                </div>
            </div>
        );
    }
}

function CurrentBalance(props) {
    return (
        <div>اعتبار کنونی
            <span className="text-dark font-weight-bold shabnam"> <PersianNumber number={props.balance}/> </span>
            تومان
        </div>
    );
}

class Increase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }


    handleChange(event){
        if (Number(event.target.value) >= 0){
            this.setState({balance : event.target.value});
        }
    }
    handleClick(){
        if(this.state.balance !== '') {
            this.props.handleClick(this.state.balance);
            this.setState({balance: ''});
        }
    }

    render() {
        return (
            <div>
                <span className="shabnam grey-color small px-5 text-right">تومان</span>
                <br />
                <div className="form-group balanceInput">
                    {(this.props.success === "false") ? (
                    <input type="text" className={"form-control grey-color placeholder-grey shabnam redError"}
                           placeholder="مبلغ مورد نظر" value={this.state.balance} onChange={this.handleChange} />
                    ) : (
                <input type="text" className={"form-control grey-color placeholder-grey shabnam"}
                       placeholder="مبلغ مورد نظر" value={this.state.balance} onChange={this.handleChange} />
                    )}
                    <br />
                <button type="button" className="btn btn-click-me text-center text-light khane-blue-background buttonMargin" onClick={this.handleClick}>افزایش اعتبار</button>
                </div>
                <br/>
                {(this.props.isLoggedIn === 'false') ? (<p className="red small text-center">{this.props.errMessage}</p>) : (<p></p>)}
            </div>

        );
    }
}

function Footer() {
    return (
        <div className="container-fluid footer position-absolute px-md-5">
            <footer className="row rtl">
                <div className="col-12 col-sm-10 my-auto">
                    <div className="shabnam text-center text-sm-right pr-md-4">تمامی حقوق مادی و معنوی این وب‌سایت متعلق
                        به نیکی و اردوان می‌باشد
                    </div>
                </div>
                <div className="col-12 col-sm-2 social-list">
                    <img className="social-icon" src={twitter} alt="twitter-icon"/>
                    <img className="social-icon" src={telegram} alt="telegram-icon"/>
                    <img className="social-icon" src={instagram} alt="instagram-icon"/>
                </div>
            </footer>
        </div>
    );
}


export default Account;
