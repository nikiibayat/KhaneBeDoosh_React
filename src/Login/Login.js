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

import DocumentTitle from 'react-document-title'
import URLSearchParams from 'url-search-params';


class Login extends React.Component {
    render() {
        return (
            <DocumentTitle title='ورود به حساب کاربری'>
                <div>
                    <NavBar/>
                    <PageTitleHeader text={"ورود به حساب کاربری"}/>
                    <LoginWebsite/>
                    <Footer/>
                </div>
            </DocumentTitle>
        );
    }
}

function NavBar() {
    return (
        <nav className="navbar fixed-top navbar-light bg-white rtl shadow">
            <NavBarLogoLink/>
            <NavBarDropdown color={"purple"}/>
        </nav>
    );
}

class LoginWebsite extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row rtl shabnam">
                    <div className="col-12 col-md-4" />
                    <div className="col-12 col-md-4 input loginForm">
                        <LoginFrom />
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
            password: ''
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.checkStatus = this.checkStatus.bind(this);
    }

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            this.setState({success: "true"});
            return response;
        } else {
            this.setState({success: "false"});
            let error = new Error(response.statusText)
            error.response = response;
            throw error
        }
    }

    handleClick(){
        // post data to API
    }

    handleUsernameChange(event){
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <div>
                <div className="form-group balanceInput">
                    <input type="text" className={"form-control grey-color placeholder-grey shabnam"}
                           placeholder="نام کاربری" value={this.state.username} onChange={this.handleUsernameChange} />
                    <br /><br />
                    <input type="text" className={"form-control grey-color placeholder-grey shabnam"}
                           placeholder="رمز عبور" value={this.state.password} onChange={this.handleChange} />
                    <br /><br />
                    <button type="button" className="btn btn-click-me text-center text-light khane-blue-background" onClick={this.handleClick}>ورود</button>
                </div>
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


export default Login;
