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
import NavBarDropdown from '../components/NavBarDropdown';
import NavBarLogoLink from "../components/NavBarLogoLink";
import PageTitleHeader from "../components/PageTitleHeader";
import { Link } from 'react-router-dom'


class Account extends React.Component {
    render(){
        return (
            <div>
                <NavBar />
                <PageTitleHeader text={"افزایش موجودی"}/>
                <IncreaseBalance />
                <Footer />
            </div>
        );
    }
}

function NavBar() {
    return (
        <nav className="navbar fixed-top navbar-light bg-white rtl shadow">
            <NavBarLogoLink/>
            <NavBarDropdown/>
        </nav>
    );
}

class IncreaseBalance extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            balance : '۰',
            success: 'true'
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkStatus = this.checkStatus.bind(this);
    }

    handleSubmit(input){
        fetch('http://localhost:8080/balance', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            // body: "balance=" + input
            body : JSON.stringify({balance : input})
        })
            .then(this.checkStatus)
            .then(response => {return response.json();})
            .then(data => {
                if (data.msg === "Error in increasing balance! Try Again!"){
                    this.setState({success: "false"});
                    alert('there');
                }
                else {
                    var newBalance = Number(this.state.balance) + Number(input);
                    this.setState({balance : newBalance});
                    alert('here');
                }
            })
            .catch(function(error) {
                console.log('request failed', error);
            })
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
            .then(responseData => {return responseData;})
            .then(data => {
                this.setState({balance: data.individual.balance});
            })
            .catch(function(error) {
                console.log('request failed', error);
            })



    }

    render() {
        return (
            <div className="container">
                <div className="row rtl shabnam">
                    <div className="col-12 col-sm-6 text-right balance grey-color font-weight-light ">
                        <CurrentBalance balance={this.state.balance}/>
                    </div>
                    <div className="col-12 col-sm-6 input inputInc py-5">
                        <Increase handleClick={this.handleSubmit} success={this.state.success} />
                    </div>
                </div>
            </div>
        );
    }
}
function CurrentBalance(props) {
    return (
        <div>اعتبار کنونی
            <span className="text-dark font-weight-bold shabnam"> {props.balance} </span>
            تومان
        </div>
    );
}
class Increase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance : '',
            isOK : 'false'
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event){
        this.setState({balance : event.target.value});
        if (this.state.balance >= 0)
            this.setState({isOK : 'true'});
    }
    handleClick(){
        this.props.handleClick(this.state.balance);
        this.setState({balance : ''});
    }

    render() {
        return (
            <div>
                <span className="shabnam grey-color small px-4 text-right">تومان</span>
                <br />
                <div className="form-group">
                    {(this.props.success === "false") ? (
                    <input type="text" className={"form-control grey-color placeholder-grey shabnam redError"}
                           placeholder="مبلغ مورد نظر" value={this.state.balance} onChange={this.handleChange} ></input>
                    ) : (
                <input type="text" className={"form-control grey-color placeholder-grey shabnam"}
                       placeholder="مبلغ مورد نظر" value={this.state.balance} onChange={this.handleChange} ></input>
                    )}
                    <br />
                <button type="button" className="btn btn-click-me text-center text-light khane-blue-background" onClick={this.handleClick}>افزایش اعتبار</button>
                </div>
                <br />
            </div>

        );
    }
}

function Footer() {
        return (
            <div className="container-fluid footer position-absolute px-md-5">
                <footer className="row rtl">
                    <div className="col-12 col-sm-10 my-auto">
                        <div className="shabnam text-center text-sm-right pr-md-4">تمامی حقوق مادی و معنوی این وب‌سایت متعلق به نیکی و اردوان می‌باشد</div>
                    </div>
                    <div className="col-12 col-sm-2 social-list">
                        <img className="social-icon" src= {twitter} alt="twitter-icon" />
                        <img className="social-icon" src={telegram} alt="telegram-icon" />
                        <img className="social-icon" src={instagram} alt="instagram-icon" />
                    </div>
                </footer>
            </div>
        );
}



export default Account;
