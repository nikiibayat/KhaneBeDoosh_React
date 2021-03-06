import React from 'react';
import 'whatwg-fetch';
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import logo from '../assets/logo.png';
import twitter from '../assets/icons/Twitter_bird_logo_2012.svg.png';
import telegram from '../assets/icons/200px-Telegram_logo.svg.png';
import instagram from '../assets/icons/200px-Instagram_logo_2016.svg.png';
import easy from '../assets/icons/726446.svg';
import reliable from '../assets/icons/726488.svg';
import comprehensive from '../assets/icons/726499.svg';
import whyKhanebedoosh from '../assets/why-khanebedoosh.jpg';
import SearchBox from "../components/SearchBox";
import {Link} from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import {withRouter} from "react-router-dom";
import './HomePage.css';
import '../shared-styles.css';
import '../reset.css'
import PersianNumber from "../components/PersianNumber";

class HomePage extends React.Component {
    render() {
        return (
            <DocumentTitle title='خانه‌به‌دوش'>
                <div>
                    <UpperBody handleHouses={this.props.handleHouses}/>
                    <LowerBody/>
                    <Footer/>
                </div>
            </DocumentTitle>
        );
    }
}

class UpperBody extends React.Component {
    render() {
        return (
            <div className="upper-body">
                <NavBar/>
                <UpperBodyContent numOfColumns={8} handleHouses={this.props.handleHouses}/>

            </div>
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
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : authorizationHeader,
            }
        })
            .then(response => {
                if(response.status === 200)
                    this.setState({isLoggedIn : 'true'});
            })
            .catch(error => {
                this.setState({isLoggedIn : 'false'});
                console.log('request failed', error);
            })
    }

    render() {
        return (
            <div>
            {(this.state.isLoggedIn === "true") ? (
            <nav className="navbar bg-transparent px-md-5">
                <div className="navbar-nav dropdown rtl">
                    <div className="nav-item nav-link border border-white navbar-dropdown-radius p-2">
                        <div className="shabnam text-white"><i className="fa fa-smile-o fa-lg"></i> ناحیه‌ی کاربری</div>
                        <DropDownWithRouter/>
                    </div>
                </div>
            </nav> ) : (
                <Link to="/login">
                    <button type="button"
                            className="btn btn-sm text-center text-light khane-blue-background shabnam my-1 mx-1 ">ورود
                    </button>
                </Link>
            )}</div>
        );
    }
}


class DropDown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            balance: ''
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleExit = this.handleExit.bind(this);

    }

    handleExit = () => {
        localStorage.setItem('access_token',null);
        this.props.history.push("/login");
    };

    componentDidMount() {
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
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization' : authorizationHeader,
            }
        })
            .then(response => {
                if(response.status === 200)
                    this.setState({isLoggedIn : 'true'});
                return response.json();
            })
            .then(data => {
                this.setState({name: data.individual.name});
                this.setState({balance: data.individual.balance});
            })
            .catch( error => {
                this.setState({isLoggedIn : 'false'});
                console.log('request failed', error);
            })


    }

    handleClick = () => {
        this.props.history.push("/balance");
    };

    render() {
        return (
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
        );
    }
}

const DropDownWithRouter = withRouter(DropDown);

class UpperBodyContent extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                {/*<div className="crossfade">*/}
                {/*<figure></figure>*/}
                {/*<figure></figure>*/}
                {/*<figure></figure>*/}
                {/*<figure></figure>*/}
                {/*<figure></figure>*/}
                {/*</div>*/}
                <Logo/>
                <SearchBox numOfColumns={this.props.numOfColumns} handleHouses={this.props.handleHouses}/>
            </div>
        );
    }
}

class Logo extends React.Component {

    render() {
        return (
            <div className="row justify-content-center">
                <figure className="figure logo-fig">
                    <Link to="/" className="logo m-auto d-block">
                        <img className="figure-img" src={logo} alt="khanebedoosh-logo"/>
                    </Link>
                    <figcaption
                        className="figure-caption text-center rtl shabnam text-white font-weight-bold">خانه‌به‌دوش
                    </figcaption>
                </figure>
            </div>
        );
    }
}

class LowerBody extends React.Component {

    render() {
        return (

            <div className="lower-body pb-md-5 pb-4">
                <div className="rtl card-deck col-md-8 col-10 mx-auto px-0 mb-5 my-2 cards">
                    <EasyBox/>
                    <ReliableBox/>
                    <ComprehensiveBox/>
                </div>

                <WhyKhanebedoosh/>
            </div>
        )
    }
}

function EasyBox() {
    return (
        <div
            className="card bg-white card-box col-md-4 col-10 text-center my-3 justify-content-center align-self-center">
            <div className="px-0 justify-content-around py-md-4 py-2">
                <div className="card-title icon-title text-title m-auto">
                    <img src={easy} className="svg-icon" alt="easy"/>
                    <div className="text-dark-grey shabnam">آسان</div>
                </div>
                <div className="card-text shabnam text-dark-grey py-md-3 mx-2">به‌سادگی صاحب خانه<br></br>شوید</div>
            </div>
        </div>
    );
}

function ReliableBox() {
    return (
        <div
            className="card bg-white card-box col-md-4 col-10 text-center mx-md-4 my-3 justify-content-center align-self-center">
            <div className="px-0 justify-content-around py-md-4 py-2">
                <div className="card-title icon-title text-title m-auto">
                    <img src={reliable} className="svg-icon" alt="easy"/>
                    <div className="text-dark-grey shabnam">مطمئن</div>
                </div>
                <div className="card-text shabnam text-dark-grey py-md-3 mx-2">با خیال راحت به‌دنبال<br></br>خانه بگردید
                </div>
            </div>
        </div>
    );
}

function ComprehensiveBox() {
    return (
        <div
            className="card bg-white card-box col-md-4 col-10 text-center my-3 justify-content-center align-self-center">
            <div className="px-0 justify-content-around py-md-4 py-2">
                <div className="card-title icon-title text-title m-auto">
                    <img src={comprehensive} className="svg-icon" alt="easy"/>
                    <div className="text-dark-grey shabnam">گسترده</div>
                </div>
                <div className="card-text shabnam text-dark-grey py-md-3 mx-2">در منطقه‌ی مورد علاقه‌ی خود صاحب خانه
                    شوید
                </div>
            </div>
        </div>
    );
}

function WhyKhanebedoosh() {
    return (
        <div className="container-fluid">
            <div className="row rtl py-md-3 text-right justify-content-center">
                <div className="col-md-8 col-11">
                    <div className="shabnam text-dark-grey font-weight-bold text-title text-center text-md-right">چرا
                        خانه‌به‌دوش؟
                    </div>
                    <div className="d-md-inline-flex py-3 px-md-2 justify-content-md-around">
                        <div className="col-10 col-md-7 px-md-1 py-1 rtl mx-auto text-justify">
                            <div className="shabnam text-dark py-1"><i
                                className="fa fa-check-circle pl-2 nav-profile-purple" aria-hidden="true"></i>اطلاعات
                                کامل و صحیح از املاک قابل معامله
                            </div>
                            <div className="shabnam text-dark py-1"><i
                                className="fa fa-check-circle pl-2 nav-profile-purple" aria-hidden="true"></i>بدون
                                محدودیت، ۲۴ ساعته و در تمام ایام هفته
                            </div>
                            <div className="shabnam text-dark py-1"><i
                                className="fa fa-check-circle pl-2 nav-profile-purple" aria-hidden="true"></i>جست‌وجوی
                                هوشمند ملک، صرفه‌جویی در زمان
                            </div>
                            <div className="shabnam text-dark py-1"><i
                                className="fa fa-check-circle pl-2 nav-profile-purple" aria-hidden="true"></i>تنوع در
                                املاک، افزایش قدرت انتخاب مشتریان
                            </div>
                            <div className="shabnam text-dark py-1"><i
                                className="fa fa-check-circle pl-2 nav-profile-purple" aria-hidden="true"></i>بانکی جامع
                                از اطلاعات هزاران آگهی به‌روز
                            </div>
                            <div className="shabnam text-dark py-1"><i
                                className="fa fa-check-circle pl-2 nav-profile-purple" aria-hidden="true"></i>دست‌یابی
                                به نتیجه‌ی مطلوب در کمترین زمان ممکن
                            </div>
                            <div className="shabnam text-dark py-1"><i
                                className="fa fa-check-circle pl-2 nav-profile-purple" aria-hidden="true"></i>همکاری با
                                مشاوران متخصص در حوزه‌ی املاک
                            </div>
                        </div>
                        <div className="col-10 col-md-5 mx-auto py-1">
                            <img src={whyKhanebedoosh} alt="why-khanebedoosh"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


function Footer() {
    return (
        <div className="container-fluid footer">
            <footer className="row rtl px-md-5">
                <div className="col-12 col-sm-10 my-auto">
                    <div className="shabnam text-center text-sm-right pr-md-4">تمامی حقوق مادی و معنوی این وب‌سایت متعلق
                        به
                        نیکی و اردوان می‌باشد
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

export default HomePage;