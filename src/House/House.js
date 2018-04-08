import React from 'react';
import 'whatwg-fetch';
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import twitter from '../assets/icons/Twitter_bird_logo_2012.svg.png';
import telegram from '../assets/icons/200px-Telegram_logo.svg.png';
import instagram from '../assets/icons/200px-Instagram_logo_2016.svg.png';
import './House.css';
import '../shared-styles.css';
import '../reset.css';
import NavBarDropdown from '../components/NavBarDropdown';
import NavBarLogoLink from "../components/NavBarLogoLink";
import PageTitleHeader from "../components/PageTitleHeader";



class House extends React.Component {
    render(){
        return (
            <div>
                <NavBar />
                <PageTitleHeader text={"مشخصات کامل ملک"}/>
                <HouseContent />
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

class HouseContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url : '',
            phone : '',
            type : '',
            price : '',
            addr : '',
            area : '',
            desc : '',
            isPayed : 'false',
            balance : '',
            clicked : 'false',
        }

        this.ID = '';
        // the user must save value of isPayed
        this.handleBalance = this.handleBalance.bind(this);
        this.handleNoDecrease = this.handleNoDecrease.bind(this);
        this.InitializeStates = this.InitializeStates.bind(this);

    }

    // this is in fact the constructor
    InitializeStates(url,phone,type,price,addr,area,desc,isPayed,balance,clicked,ID){
        this.setState({balance: balance});
        this.setState({url: url});
        this.setState({phone : phone});
        this.setState({isPayed : isPayed});
        this.setState({type: type});
        this.setState({price: price});
        this.setState({addr: addr});
        this.setState({area: area});
        this.setState({clicked: clicked});
        this.setState({desc: desc});
        this.ID = ID;
    }

    handleBalance() {
        this.setState({clicked : 'true'});
        if (this.state.balance >= 1000 ){
            var newBalance = this.state.balance - 1000;
            // here we should also the real user balance
            this.setState({balance: newBalance});
            this.setState({phone : this.state.phone});
            this.setState({isPayed : 'true'});
        }
        else {
            this.setState({isPayed : 'false'});
        }
    }

    handleNoDecrease(){
        this.setState({clicked : 'true'});
        this.setState({phone : this.state.phone});
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="row rtl shabnam mt-5">
                    <div className="col-12 col-md-4">
                        <div className="btn purpleButton">فروش</div>
                        <PhoneNumber phone={this.state.phone} isPayed={this.state.isPayed} clicked={this.state.clicked} />
                        <BuildingType type={this.state.type} />
                        <Price price={this.state.price} />
                        <Address addr={this.state.addr} />
                        <Area area={this.state.area} />
                        <Description desc={this.state.desc} />
                    </div>
                    <div className="col-12 col-md-1"></div>
                    <div className="col-12 col-md-7">
                        <Image  url={process.env.PUBLIC_URL + this.state.url} />
                    </div>
                    <div class="col12 col-md-4"></div>
                    <div class="col12 col-md-1"></div>
                    <div class="col12 col-md-7 mb-3">
                        <ShowPhoneNumberButton isPayed={this.state.isPayed} handleShowPhoneNumButton={this.handleShowPhoneNumButton}
                                               handleBalance={this.handleBalance} clicked={this.state.clicked}
                                               handleNoDecrease={this.handleNoDecrease}></ShowPhoneNumberButton>
                    </div>
                </div>
            </div>
        );
    }
}

function PhoneNumber(props) {
    if (props.isPayed === 'false' ||  props.clicked ==='false'){
        return(
            <div className="mt-5">
                <p className="grey-color float-right HouseText">شماره مالک/مشاور</p>
                <p className="leftTOright">***********</p>
                <hr className="lineMargin line" />
            </div>
        );
    }
    else if(props.isPayed === 'true' && props.clicked ==='true'){
        return(
            <div className="mt-5">
                <p className="grey-color float-right HouseText">شماره مالک/مشاور</p>
                <p className="leftTOright">{props.phone}</p>
                <hr className="lineMargin line" />
            </div>
        );
    }
    else {
        return(null);
    }

}

function BuildingType(props) {
    return(
        <div>
            <p class="grey-color float-right HouseText">نوع ساختمان</p>
            <p>{props.type}</p>
            <hr class="lineMargin line" />
        </div>
    );
}

function Price(props) {
    return(
        <div>
            <p class="grey-color float-right HouseText">قیمت</p>
            <p>{props.price} تومان</p>
            <hr class="lineMargin line" />
        </div>
    );
}

function Address(props) {
    return(
        <div>
            <p class="grey-color float-right HouseText">آدرس</p>
            <p>{props.addr}</p>
            <hr class="lineMargin line" />
        </div>
    );
}

function Area(props) {
    return(
        <div>
            <p class="grey-color float-right HouseText">متراژ</p>
            <p>{props.area} مترمربع </p>
            <hr class="lineMargin line" />
        </div>
    );
}

function Description(props) {
    return(
        <div>
            <p class="grey-color float-right HouseText">توضیحات</p>
            <p>{props.desc}</p>
            <hr class="lineMargin line" />
        </div>
    );
}

function Image(props) {
    return(
        <img src={props.url} alt="house_picture" className="imageRadius Houseimage" />
    );
}

class ShowPhoneNumberButton extends React.Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleNoDecrease = this.handleNoDecrease.bind(this);

    }

    handleChange (){
        this.props.handleBalance();
    }
    handleNoDecrease(){
        this.props.handleNoDecrease();
    }

    render(){

        if(this.props.isPayed === 'true') {
            if (this.props.clicked === 'false') {
                return (
                    <ShowPhone handleBalance={this.handleNoDecrease}/>
                );
            }
            else {
                return (null);
            }
        }
        else {
            if(this.props.clicked === 'false')
            {
                return(
                    <ShowPhone handleBalance={this.handleChange} />
                );
            }
            else {
                return(
                    <LowBalance />
                );
            }
        }
    }

}

function LowBalance (){
    return(
        <div class="btn btn-click-me yellowButton mt-4 ">اعتبار شما برای مشاهده شماره مالک/مشاور این ملک کافی نیست</div>
    );
}

function ShowPhone(props) {
    return(
        <div class="btn btn-click-me blueButton mt-4 " onClick={props.handleBalance}>مشاهده شماره مالک/مشاور</div>
    );
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

export default House;