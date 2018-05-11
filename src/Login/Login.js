import React from 'react';
import 'whatwg-fetch';
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import twitter from '../assets/icons/Twitter_bird_logo_2012.svg.png';
import telegram from '../assets/icons/200px-Telegram_logo.svg.png';
import instagram from '../assets/icons/200px-Instagram_logo_2016.svg.png';
import './Login.css';
import '../shared-styles.css';
import '../reset.css';
import NavBarDropdown from '../components/NavBarDropdown';
import NavBarLogoLink from "../components/NavBarLogoLink";
import PageTitleHeader from "../components/PageTitleHeader";
import {Link} from 'react-router-dom';
import DocumentTitle from 'react-document-title'
import URLSearchParams from 'url-search-params';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
    render() {
        return (
            <DocumentTitle title='ورود به حساب کاربری'>
                <div>
                    <NavBar/>
                    <PageTitleHeader text={"ورود به حساب کاربری"}/>
                    <LoginWebsite history={this.props.history}/>
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
        let url = 'http://localhost:8080/users/';

        let authorizationHeader ;
        if(localStorage.getItem("access_token") === "null"){
            authorizationHeader = "Bearer ";
        }
        else{
            authorizationHeader = 'Bearer ' + localStorage.getItem("access_token");
        }

        fetch(url, {
            method: 'GET',
            headers: {
                'content_type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : authorizationHeader,
            }
        })
            .then(response => {
                if(response.status === 200)
                    this.setState({isLoggedIn : 'true'});
            })
            .catch(error => {
                console.log('request failed in login JWT', error);
                this.setState({isLoggedIn : 'false'});
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

class LoginWebsite extends React.Component {

    render() {
        return (
            <div className="container">
                <div className="row rtl shabnam">
                    <div className="col-12 col-md-4" />
                    <div className="col-12 col-md-4 input loginForm">
                        <LoginFrom history={this.props.history}/>
                    </div>
                    <div className="col-12 col-md-4" />
                </div>
            </div>
        );
    }
}


class LoginFrom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            inputType: 'password',
            errMessage: ''
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.showPassword = this.showPassword.bind(this);
        this.handleExit = this.handleExit.bind(this);
    }


    handleClick(){
        this.setState({errMessage : ''});
        const searchParams = new URLSearchParams();
        searchParams.set('username', this.state.username);
        searchParams.set('password', this.state.password);
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: searchParams
        })
            .then(response => {
                console.log(response.status);
                console.log(response.statusText);
                if(response.status !== 200)
                    throw response;
                else
                    return response.json();
            })
            .then(responseData => {
                return responseData;
            })
            .then(data => {
                console.log("server respone :  " + data.access_token);
                localStorage.setItem('access_token', data.access_token);
                if(localStorage.getItem("houseID") !== "")
                    this.props.history.push("/House");
            })
            .catch(error => {
                this.setState({errMessage : 'نام کاربری یا رمز‌عبور اشتباه است'});
                console.log('request failed', error);
            });
        this.setState({username : ''});
        this.setState({password : ''});
    }

    handleUsernameChange(event){
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }

    showPassword(event){
        if (this.state.inputType === "password") {
            this.setState({inputType: "text"});
        } else {
            this.setState({inputType: "password"});
        }
    }

    handleExit() {
        localStorage.setItem('access_token',null);
    }

    render() {
        return (
            <div>
                <div className="form-group balanceInput">
                    <input type="text" className={"form-control grey-color placeholder-grey shabnam"}
                           placeholder="نام کاربری" value={this.state.username} onChange={this.handleUsernameChange} />
                    <br /><br />
                    <input type={this.state.inputType} className={"form-control grey-color placeholder-grey shabnam"}
                           placeholder="رمز عبور" value={this.state.password} onChange={this.handlePasswordChange} />
                    <br />
                    <input type="checkbox" onClick={this.showPassword} className="leftMargin"/> <span className="grey-color small rightMargin">نمایش رمز عبور</span>
                    <br /><br />
                    <button type="button" className="btn btn-click-me text-center text-light khane-blue-background" onClick={this.handleClick}>ورود</button>
                    <br /><br />
                    <button type="button" className="btn btn-click-me btn-sm text-center text-dark btn-border" onClick={this.handleExit}>خروج</button>
                </div>
                <p className="small red ml-5">{this.state.errMessage}</p>
                <br/>
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


export default withRouter(Login);
