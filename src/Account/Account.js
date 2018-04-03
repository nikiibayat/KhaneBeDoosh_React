import React from 'react';
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import logo from '../assets/logo.png';
import twitter from '../assets/icons/Twitter_bird_logo_2012.svg.png';
import telegram from '../assets/icons/200px-Telegram_logo.svg.png';
import instagram from '../assets/icons/200px-Instagram_logo_2016.svg.png';
import './Account.css';
import '../shared-styles.css';
import '../reset.css'

class Account extends React.Component {
    render(){
        return (
            <div>
                <NavBar />
                <Header />
                <IncreaseBalance />
                <Footer />
            </div>
        );
    }
}

class NavBar extends React.Component {
  render() {
    return (
        <nav className="navbar fixed-top navbar-light bg-white rtl shadow">
            <Brand />
            <div className="navbar-nav dropdown">
                <div className="nav-item nav-link">
                      <div className="shabnam nav-profile-purple"><i className="fa fa-smile-o fa-lg" /> ناحیه‌ی کاربری</div>
                      <DropDown />
                  </div>
              </div>
        </nav>
    );
  }
}
function Brand() {
    return (
        <a className="navbar-brand shabnam" href="../HomePage/homepage.html">
            <img src={logo} width={30} height={30} className="d-inline-block align-top" alt="logo" />
            <span className="khane-blue font-weight-bold">خانه‌به‌دوش</span>
        </a>
    );
}
class DropDown extends React.Component {
    render() {
        return (
            <div className="dropdown-content shabnam dropdown-responsive pt-4">
                <div className="container-fluid">
                    <div className="row">
                        <div className="text-dark h5">بهنام همایون</div>
                    </div>
                    <div className="row py-3 grey-color">
                        <div className="col-5 px-0 text-right">اعتبار</div>
                        <div className="col-7 px-0 text-left">۲۰۰۰۰ تومان</div>
                    </div>
                    <div className="row py-4 justify-content-center">
                        <button type="button" className="col-10 btn btn-click-me px-1 text-center text-light
                            khane-blue-background">افزایش اعتبار</button>
                    </div>
                </div>
            </div>
        );
    }
}


function Header() {
    return (
        <div className="container-fluid">
            <div className="row rtl">
                <div className="shabnam khane-blue font-weight-bold text-right header_desktop header_mobile">افزایش موجودی</div>
            </div>
        </div>
    );
}

class IncreaseBalance extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row rtl shabnam">
                    <div className="col-12 col-sm-6 text-right balance grey-color font-weight-light ">
                        <CurrentBalance />
                    </div>
                    <div className="col-12 col-sm-6 input inputInc py-5">
                        <Increase />
                    </div>
                </div>
            </div>
        );
    }
}
class CurrentBalance extends React.Component {
    render() {
        return (
            <div>اعتبار کنونی
                <span className="text-dark font-weight-bold shabnam"> ۲۰۰۰۰ </span>
                تومان
            </div>
        );
    }
}
class Increase extends React.Component {
    render() {
        return (
            <div>
                <span className="shabnam grey-color small px-4 text-right">تومان</span>
                <br />
                <div className="form-group">
                <input type="text" className="form-control grey-color placeholder-grey shabnam" placeholder="مبلغ مورد نظر" /><br />
                <button type="button" className="btn btn-click-me text-center text-light khane-blue-background">افزایش اعتبار</button>
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
