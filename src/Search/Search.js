import React from 'react';
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import twitter from '../assets/icons/Twitter_bird_logo_2012.svg.png';
import telegram from '../assets/icons/200px-Telegram_logo.svg.png';
import instagram from '../assets/icons/200px-Instagram_logo_2016.svg.png';
import SearchBox from '../components/SearchBox';
import NavBarDropdown from '../components/NavBarDropdown'
import './Search.css';
import '../shared-styles.css';
import '../reset.css'
import NavBarLogoLink from "../components/NavBarLogoLink";
import PageTitleHeader from "../components/PageTitleHeader";

class Search extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavBar/>
                <PageTitleHeader text={"نتایج جست‌وجو"}/>
                <MoreInfoText/>
                <SearchResults/>
                <SearchAgainText/>
                <SearchBox numOfColumns={9}/>
                <br/><br/>
                <Footer/>
            </div>
        );
    }
}

class SearchResults extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div></div>
        );
    }
}

function MoreInfoText(){
    return(
        <div className="container-fluid grey-color py-4 h5 rtl">
            <div className="row text-center justify-content-center shabnam mobileMargin">
                <p>برای مشاهده اطلاعات بیشتر درباره‌ی هر ملک روی آن کلیک کنید</p>
            </div>
        </div>
    );
}

function SearchAgainText(){
    return(
        <div className="container-fluid grey-color py-3 h5 rtl mt-2">
            <div className="row text-center justify-content-center shabnam">
                <p>جستجوی مجدد</p>
            </div>
        </div>
    );
}

function NavBar(){
    return(
        <nav className="navbar fixed-top navbar-light bg-white rtl shadow">
            <NavBarLogoLink/>
            <NavBarDropdown/>
        </nav>
    );
}

function Footer() {
    return (
        <div className="container-fluid footer">
            <footer className="row rtl px-md-5">
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


export default Search;
