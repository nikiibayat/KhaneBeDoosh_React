import React from 'react';
import 'whatwg-fetch';
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import twitter from '../assets/icons/Twitter_bird_logo_2012.svg.png';
import telegram from '../assets/icons/200px-Telegram_logo.svg.png';
import instagram from '../assets/icons/200px-Instagram_logo_2016.svg.png';
import './AddMelk.css';
import '../shared-styles.css';
import '../reset.css';
import NavBarDropdown from '../components/NavBarDropdown';
import NavBarLogoLink from "../components/NavBarLogoLink";
import PageTitleHeader from "../components/PageTitleHeader";
import DocumentTitle from 'react-document-title';
import URLSearchParams from "url-search-params";

class AddMelk extends React.Component {
    render() {
        return (
            <DocumentTitle title='ثبت ملک'>
                <div>
                    <NavBar/>
                    <PageTitleHeader text={"ثبت ملک جدید در خانه‌به‌دوش"}/>
                    <AddMelkForm/>
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
            <NavBarDropdown/>
        </nav>
    );
}

class AddMelkForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            BuildingType: '',
            RentPrice: '',
            BasePrice: '',
            DealType: '1',
            MaxMeter: '',
            Address: '',
            PhoneNumber: '',
            Description: ''

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBuildingType = this.handleBuildingType.bind(this);
        this.handleRentPrice = this.handleRentPrice.bind(this);
        this.handleBasePrice = this.handleBasePrice.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handleDealType = this.handleDealType.bind(this);
        this.handleMaxMeter = this.handleMaxMeter.bind(this);
        this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
    }

    handleBuildingType(input) {
        this.setState({BuildingType: input});
    }

    handleRentPrice(input) {
        this.setState({RentPrice: input});
    }

    handleBasePrice(input) {
        this.setState({BasePrice: input});
    }

    handleAddress(input) {
        this.setState({Address: input});
    }

    handleDealType(input) {
        this.setState({DealType: input});
    }

    handleMaxMeter(input) {
        this.setState({MaxMeter: input});
    }

    handleDescription(input) {
        this.setState({Description: input});
    }

    handlePhoneNumber(input) {
        this.setState({PhoneNumber: input});
    }

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            let error = new Error(response.statusText)
            error.response = response;
            throw error
        }
    }

    handleSubmit(event) {
        const searchParams = new URLSearchParams();
        searchParams.set('buildingType', this.state.BuildingType);
        searchParams.set('area', this.state.MaxMeter);
        searchParams.set('description', this.state.Description);
        searchParams.set('dealType', this.state.DealType);
        searchParams.set('phone', this.state.PhoneNumber);
        searchParams.set('address', this.state.Address);
        searchParams.set('price', this.state.BasePrice);

        fetch('http://localhost:8080/houses', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: searchParams
        })
            .then(this.checkStatus)
            .then(function (response) {
                console.log(response.status);
                console.log(response.statusText);
            })
            .catch(function (error) {
                console.log('request failed', error);
            });

        this.setState({BuildingType: ''});
        this.setState({RentPrice: ''});
        this.setState({BasePrice: ''});
        this.setState({Address: ''});
        this.setState({PhoneNumber: ''});
        this.setState({Description: ''});
        this.setState({MaxMeter: ''});
        this.setState({DealType: '1'});
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row justify-content-center searchForm">
                    <form className="col-12 col-md-10 py-5">
                        <div className="form-row rtl shabnam ">
                            <div className="col-md-6 mb-2">
                                <DealType handleDealType={this.handleDealType} DealType={this.state.DealType}/>
                            </div>
                            <div className="col-md-6"></div>
                            <div className="form-row rtl my-md-1 shabnam justify-content-center">
                                <div className="form-group col-12 col-md-6">
                                    <BuildingType handleBuildingType={this.handleBuildingType}
                                                  BuildingType={this.state.BuildingType}/>
                                </div>
                                <div className="form-group col-12 col-md-6">
                                    <MaxMeter handleMaxMeter={this.handleMaxMeter} MaxMeter={this.state.MaxMeter}/>
                                </div>

                                <div className="form-group col-12 col-md-6">
                                    <Address handleAddress={this.handleAddress} Address={this.state.Address}/>
                                </div>
                                <div className="form-group col-12 col-md-6 ">
                                    <BasePrice handleBasePrice={this.handleBasePrice} BasePrice={this.state.BasePrice}/>
                                </div>
                                <div className="form-group col-12 col-md-6">
                                    <PhoneNumber handlePhoneNumber={this.handlePhoneNumber}
                                                 PhoneNumber={this.state.PhoneNumber}/>
                                </div>
                                <div className="form-group col-12 col-md-6">
                                    <RentPrice handleRentPrice={this.handleRentPrice} RentPrice={this.state.RentPrice}/>
                                </div>

                                <div className="form-group col-12 col-md-12">
                                    <Description handleDescription={this.handleDescription}
                                                 Description={this.state.Description}/>
                                </div>
                            </div>

                            <div className="col-md-8"></div>
                            <div className="col-12 col-md-4 py-3">
                                <button type="button"
                                        className="btn btn-click-me text-center text-light khane-blue-background search-button"
                                        onClick={this.handleSubmit}>ثبت ملک
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        );
    }

}

class DealType extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.handleDealType(event.target.value);
    }

    render() {
        return (
            <div>
                <div className="form-check form-check-inline float-right">
                    <input className="form-check-input" type="radio" name="dealType"
                           value="1" checked={this.props.DealType === '1'} onChange={this.handleChange}/>
                    <label className="form-check-label px-2 " >
                        رهن و اجاره
                    </label>
                </div>
                <div className="form-check form-check-inline float-right">
                    <input className="form-check-input" type="radio" name="dealType" value="0"
                           onChange={this.handleChange} checked={this.props.DealType === '0'}/>
                    <label className="form-check-label px-2 " >
                        خرید
                    </label>
                </div>
            </div>
        );
    }
}

class BuildingType extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.handleBuildingType(event.target.value);
    }

    render() {
        return (
            <div>
                <label className="form-check-label"></label>
                <select className="form-control form-inline rtl shabnam" required value={this.props.BuildingType}
                        name="buildingType" onChange={this.handleChange}>
                    <option value="" disabled className="grey-color">نوع ملک</option>
                    <option value="villa">ویلایی</option>
                    <option value="apartment">آپارتمان</option>
                </select>
            </div>
        );
    }
}

class MaxMeter extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.handleMaxMeter(event.target.value);
    }

    render() {
        return (
            <div>
                <label className="form-check-label grey-color small">متر مربع</label>
                <input type="text" className="form-control form-inline rtl shabnam placeholder-grey"
                       placeholder="متراژ" name="area" value={this.props.MaxMeter} onChange={this.handleChange}/>
            </div>
        );
    }
}

class Address extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.handleAddress(event.target.value);
    }

    render() {
        return (
            <div>
                <label className="form-check-label text-white small"></label>
                <input type="text" className="form-control form-inline rtl shabnam placeholder-grey"
                       placeholder="آدرس" name="address" value={this.props.Address} onChange={this.handleChange}/>
            </div>
        );
    }
}

class RentPrice extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.handleRentPrice(event.target.value);
    }

    render() {
        return (
            <div>
                <label className="form-check-label grey-color small">مترمربع</label>
                <input type="text" disabled className="form-control form-inline rtl shabnam placeholder-grey"
                       /* placeholder="قیمت اجاره" value={this.props.RentPrice} onChange={this.handleChange}*//>
            </div>
        );
    }
}

class BasePrice extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.handleBasePrice(event.target.value);
    }

    render() {
        return (
            <div>
                <label className="form-check-label grey-color small">تومان</label>
                <input type="text" className="form-control form-inline rtl shabnam placeholder-grey"
                       placeholder="قیمت" name="price" value={this.props.BasePrice} onChange={this.handleChange}/>
            </div>
        );
    }
}

class PhoneNumber extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.handlePhoneNumber(event.target.value);
    }

    render() {
        return (
            <div>
                <label className="form-check-label text-white small"></label>
                <input type="text" className="form-control form-inline rtl shabnam placeholder-grey"
                       placeholder="شماره تماس" name="phone" value={this.props.PhoneNumber} onChange={this.handleChange}/>
            </div>
        );
    }
}

class Description extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.handleDescription(event.target.value);
    }

    render() {
        return (
            <div>
                <label className="form-check-label text-white small"></label>
                <input type="text" className="form-control form-inline rtl shabnam placeholder-grey"
                       placeholder="توضیحات" name="description" value={this.props.Description} onChange={this.handleChange}/>
            </div>
        );
    }
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

export default AddMelk;