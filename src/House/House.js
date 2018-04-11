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
import PersianNumber from "../components/PersianNumber";




class House extends React.Component {
    render(){
        return (
            <div>
                <NavBar />
                <PageTitleHeader text={"مشخصات کامل ملک"}/>
                <HouseContent id={this.props.id}/>
                <Footer />
            </div>
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

class HouseContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url : '',
            phone : '',
            type : '',
            price : '',
            basePrice : '',
            rentPrice : '',
            addr : '',
            area : '',
            desc : '',
            hasPayed : 'false',
            balance : '',
            clicked : 'false',
            dealType : ''
        }

        this.ID = this.props.id;
        this.handleBalance = this.handleBalance.bind(this);
        this.InitializeHouse = this.InitializeHouse.bind(this);
        this.isPayed = this.isPayed.bind(this);
        this.checkStatus = this.checkStatus.bind(this);

    }

    componentDidMount(){
        this.isPayed();
        this.InitializeHouse();
    }

    InitializeHouse(){

        let url = 'http://localhost:8080/houses/' + this.ID;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(this.checkStatus)
            .then(response => {
                return response.json();
            })
            .then(data => {

                // const houseImage = (data.house.imageURL !== null) ? data.house.imageURL : {nopic} ;

                this.setState({url: data.house.imageURL });
                this.setState({phone : data.house.phone});
                this.setState({type: data.house.persianBuildingType });
                this.setState({price: data.house.sellPrice });
                this.setState({rentPrice: data.house.rentPrice });
                this.setState({basePrice: data.house.basePrice });
                this.setState({addr: data.house.address });
                this.setState({area: data.house.area });
                this.setState({dealType: data.house.dealType });
                this.setState({desc: data.house.description});
            })
            .catch(function(error) {
                console.log('request failed', error);
            })


    }

    isPayed(){
        let url = 'http://localhost:8080/users?username=behnamhomayoon&houseID=' + this.ID;
        console.log(url);
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(this.checkStatus)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({hasPayed: data.hasPayed});
                this.setState({balance: data.individual.balance});
            })
            .catch(function(error) {
                console.log('request failed', error);
            })
    }

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            let error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }

    handleBalance() {
        this.setState({clicked : 'true'});
        let url = 'http://localhost:8080/houses/' + this.ID + '/phone';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(this.checkStatus)
            .then(response => {return response.json();})
            .then(data => {
                if(data.purchaseSuccessStatus === "true"){
                    this.setState({hasPayed : true});
                }
                else if(data.purchaseSuccessStatus === "false"){
                    alert('not in somewhere good');
                    this.setState({hasPayed : false});
                }
            })
            .catch(function(error) {
                console.log('request failed', error);
            });

    }


    render() {
        return(
            <div className="container-fluid">
                <div className="row rtl shabnam mt-5">
                    <div className="col-12 col-md-4">
                        {(Number(this.state.dealType) === 0)?
                            <div className="btn purpleButton">فروش</div>
                            :
                            <div className="btn redButton">رهن و اجاره</div>
                        }
                        <br />
                        <PhoneNumber phone={this.state.phone} hasPayed={this.state.hasPayed} clicked={this.state.clicked} />
                        <BuildingType type={this.state.type} />
                        <Price price={this.state.price} rentPrice={this.state.rentPrice} basePrice={this.state.basePrice} dealType={this.state.dealType} />
                        <Address addr={this.state.addr} />
                        <Area area={this.state.area} />
                        <Description desc={this.state.desc} />
                    </div>
                    <div className="col-12 col-md-1"/>
                    <div className="col-12 col-md-7">
                        <Image  url={this.state.url} />
                    </div>
                    <div className="col12 col-md-4"/>
                    <div className="col12 col-md-1"/>
                    <div className="col12 col-md-7 mb-3">
                        <ShowPhoneNumberButton hasPayed={this.state.hasPayed} handleShowPhoneNumButton={this.handleShowPhoneNumButton}
                                               handleBalance={this.handleBalance} clicked={this.state.clicked}
                                               handleNoDecrease={this.handleNoDecrease}/>
                    </div>
                </div>
            </div>
        );
    }
}

function PhoneNumber(props) {
    if (props.hasPayed === false ||  props.clicked ==='false'){
        return(
            <div className="mt-5">
                <p className="grey-color float-right HouseText">شماره مالک/مشاور</p>
                <p className="leftTOright">***********</p>
                <hr className="lineMargin line" />
            </div>
        );
    }
    else if(props.hasPayed === true && props.clicked ==='true'){
        return(
            <div className="mt-5">
                <p className="grey-color float-right HouseText">شماره مالک/مشاور</p>
                <p className="leftTOright"><PersianNumber number={props.phone}/></p>
                <hr className="lineMargin line" />
            </div>
        );
    }
    else {
        return(
            <div className="mt-5">
                <p className="grey-color float-right HouseText">شماره مالک/مشاور</p>
                <p className="leftTOright">***********</p>
                <hr className="lineMargin line" />
            </div>
        );
    }

}

function BuildingType(props) {
    return(
        <div>
            <p className="grey-color float-right HouseText">نوع ساختمان</p>
            <p>{props.type}</p>
            <hr className="lineMargin line" />
        </div>
    );
}

function Price(props) {
    return(
        <div>
            {(props.dealType === '0') ? (
                <div>
                    <p class="grey-color float-right HouseText">قیمت</p>
                    <p> <PersianNumber number={props.price}/> تومان</p>
                    <hr class="lineMargin line" />
                </div>
                ): (
                    <div>
                        <p className="grey-color float-right HouseText">قیمت رهن</p>
                        <p> <PersianNumber number={props.basePrice}/> تومان</p>
                        <hr className="lineMargin line" />
                        <p className="grey-color float-right HouseText">قیمت اجاره</p>
                        <p> <PersianNumber number={props.rentPrice}/> تومان</p>
                        <hr className="lineMargin line" />
                    </div>
                )
            }
        </div>
    );
}

function Address(props) {
    return(
        <div>
            <p className="grey-color float-right HouseText">آدرس</p>
            <p>{props.addr}</p>
            <hr className="lineMargin line" />
        </div>
    );
}

function Area(props) {
    return(
        <div>
            <p className="grey-color float-right HouseText">متراژ</p>
            <p><PersianNumber number={props.area}/> مترمربع </p>
            <hr className="lineMargin line" />
        </div>
    );
}

function Description(props) {
    return(
        <div>
            <p className="grey-color float-right HouseText">توضیحات:</p>
            <p>{props.desc}</p>
            <hr className="lineMargin line" />
        </div>
    );
}

function Image(props) {
    // process.env.PUBLIC_URL
    return(
        <div>
        {(props.url != null) ?
            (<img src={props.url} alt="house_picture" className="imageRadius Houseimage"/>) :
            (<img src={process.env.PUBLIC_URL+'no-pic.jpg'} alt="house_picture" className="imageRadius Houseimage"/>)}
        </div>
        );

}

class ShowPhoneNumberButton extends React.Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange (){
        this.props.handleBalance();
    }

    render(){

        if(this.props.hasPayed === true) {
            if (this.props.clicked === 'false') {
                return (
                    <ShowPhone handleBalance={this.handleChange}/>
                );
            }
            else {
                return (null);
            }
        }
        else{
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
        <div className="btn btn-click-me yellowButton mt-4 ">اعتبار شما برای مشاهده شماره مالک/مشاور این ملک کافی نیست</div>
    );
}

function ShowPhone(props) {
    return(
        <div className="btn btn-click-me blueButton mt-4 " onClick={props.handleBalance}>مشاهده شماره مالک/مشاور</div>
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