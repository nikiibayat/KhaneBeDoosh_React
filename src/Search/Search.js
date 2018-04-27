import React from 'react';
import 'whatwg-fetch';
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import twitter from '../assets/icons/Twitter_bird_logo_2012.svg.png';
import telegram from '../assets/icons/200px-Telegram_logo.svg.png';
import instagram from '../assets/icons/200px-Instagram_logo_2016.svg.png';
import SearchBox from '../components/SearchBox';
import NavBarDropdown from '../components/NavBarDropdown'
import NavBarLogoLink from "../components/NavBarLogoLink";
import PageTitleHeader from "../components/PageTitleHeader";
import PersianNumber from "../components/PersianNumber";
import nopic from '../assets/no-pic.jpg'
import {Link} from 'react-router-dom';
import './Search.css';
import '../shared-styles.css';
import '../reset.css'

class Search extends React.Component {
    render() {
        return (
            <div>
                <NavBar/>
                <PageTitleHeader text={"نتایج جست‌وجو"}/>
                <MoreInfoText/>
                <SearchResultsList houses={this.props.houses} handleID={this.props.handleID}/>
                <SearchAgainText/>
                <SearchBox numOfColumns={9} handleHouses={this.props.handleHouses}/>
                <br/><br/>
                <Footer/>
            </div>
        );
    }
}

class SearchResultsList extends React.Component {
    constructor(props) {
        super(props);
        this.data = this.props.houses;
    }

    render() {
        const handler = this.props.handleID;
        // console.log(this.data.imageURL);
        return (
            <div className="container-fluid">
                <div className="row shabnam mobileFont">
                    {
                        (this.data.length !== 0) ? (
                            this.data.houses.map(function (data, i) {
                                return <ResultBox key={i} dealType={data.dealType}
                                                  position={(i % 2 === 0) ? 'left' : 'right'}
                                                  imageURL={data.imageURL} area={data.area}
                                                  address={data.address} basePrice={data.basePrice}
                                                  sellPrice={data.sellPrice}
                                                  rentPrice={data.rentPrice} ID={data.id} handleID={handler}/>;
                            })) : (null)
                    }

                </div>
            </div>
        );
    }
}

class ResultBox extends React.Component {
    constructor(props) {
        super(props);

        this.handleBoxClick = this.handleBoxClick.bind(this);
    }

    handleBoxClick() {
        this.props.handleID(this.props.ID);
    }

    render() {
        const dealType = this.props.dealType;
        const position = this.props.position;
        const houseImage = this.props.imageURL;
        const area = this.props.area;
        const address = this.props.address;
        const basePrice = this.props.basePrice;
        const sellPrice = this.props.sellPrice;
        const rentPrice = this.props.rentPrice;
        console.log("it is: " + typeof (houseImage));
        return (
            <div className="col-12 col-sm-6 rtl">
                <div className={"resultbox " + ((position === "right") ? " boxMargin" : "")}>
                    <Link to="/House" onClick={this.handleBoxClick}>
                        {(dealType === 0) ? (
                            <div className="btn mt-2  purpleBu">فروش</div>
                        ) : (
                            <div className="btn  mt-2 redBu">رهن و اجاره</div>
                        )}
                        {(houseImage !== "null") ?
                            (<img src={houseImage} alt="house_picture" className="imageRadius dimension"/>) :
                            (<img src={process.env.PUBLIC_URL+'no-pic.jpg'} alt="no_pic" className="imageRadius dimension"/>)}

                        <p className="text-right px-4">
                            <span className="location"><PersianNumber number={area}/> متر مربع</span>
                            {(dealType === "sale") ? (
                                <span className="px-2 purple">
                                <i className="fa fa-map-marker" aria-hidden="true"/>
                                </span>
                            ) : (
                                <span className="px-2 red">
                                <i className="fa fa-map-marker" aria-hidden="true"/>
                                </span>
                            )}
                            {address}
                        </p>
                        <hr className="LineWidth MarginLine"/>
                        {(dealType === 0) ? (
                            <div className="text-right px-4">قیمت&nbsp; <PersianNumber number={sellPrice}/>
                                <span className="grey-color small"> تومان</span>
                            </div>
                        ) : (
                            <p className="row px-4">
                                <span className="col-6 text-right px-0 px-md-3">رهن
                                    &nbsp; <PersianNumber number={basePrice}/>
                                    <span className="grey-color small"> تومان</span>
                                </span>
                                <span className="col-6 px-0 px-md-3">اجاره <PersianNumber number={rentPrice}/>
                                    <span className="grey-color small"> تومان</span>
                                </span>
                            </p>
                        )}
                    </Link>
                </div>
            </div>
        );
    }
}

function MoreInfoText() {
    return (
        <div className="container-fluid grey-color py-4 h5 rtl">
            <div className="row text-center justify-content-center shabnam mobileMargin">
                <p>برای مشاهده اطلاعات بیشتر درباره‌ی هر ملک روی آن کلیک کنید</p>
            </div>
        </div>
    );
}

function SearchAgainText() {
    return (
        <div className="container-fluid grey-color py-3 h5 rtl mt-2">
            <div className="row text-center justify-content-center shabnam">
                <p>جستجوی مجدد</p>
            </div>
        </div>
    );
}

function NavBar() {
    return (
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
