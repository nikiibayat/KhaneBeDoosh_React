import React from 'react';
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import twitter from '../assets/icons/Twitter_bird_logo_2012.svg.png';
import telegram from '../assets/icons/200px-Telegram_logo.svg.png';
import instagram from '../assets/icons/200px-Instagram_logo_2016.svg.png';
import SearchForm from "../components/SearchForm";
import './Search.css';
import '../shared-styles.css';
import '../reset.css'

class Search extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <SearchBox/>
                <br/><br/>
                <Footer/>
            </div>
        );
    }
}

class SearchBox extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <section className="container-fluid ">
                <div className="row justify-content-center mb-2 searchForm">
                    <SearchForm numOfColumns={'9'}/>
                </div>
                <div className="row justify-content-center mt-2 searchForm">
                    <div className="col-11 col-md-9 search-form shabnam rtl text-white text-center py-2">صاحب خانه هستید؟ خانه‌ی خود را ثبت کنید</div>
                </div>
            </section>
        );
    }
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
