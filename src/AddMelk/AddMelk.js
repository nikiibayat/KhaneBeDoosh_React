import React from 'react';
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import logo from '../assets/logo.png';
import twitter from '../assets/icons/Twitter_bird_logo_2012.svg.png';
import telegram from '../assets/icons/200px-Telegram_logo.svg.png';
import instagram from '../assets/icons/200px-Instagram_logo_2016.svg.png';
import './AddMelk.css';
import '../shared-styles.css';
import '../reset.css'

class AddMelk extends React.Component {
    render() {
        return (
            <div>
                <NavBar/>
                <Header/>
                <AddMelkForm />
                <Footer/>
            </div>
        );
    }
}

class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar fixed-top navbar-light bg-white rtl shadow">
                <Brand/>
                <div className="navbar-nav dropdown">
                    <div className="nav-item nav-link">
                        <div className="shabnam nav-profile-purple"><i className="fa fa-smile-o fa-lg"/> ناحیه‌ی کاربری
                        </div>
                        <DropDown/>
                    </div>
                </div>
            </nav>
        );
    }
}

function Brand() {
    return (
        <a className="navbar-brand shabnam" href="../HomePage/homepage.html">
            <img src={logo} width={30} height={30} className="d-inline-block align-top" alt="logo"/>
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
                            khane-blue-background">افزایش اعتبار
                        </button>
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
                <div className="shabnam khane-blue font-weight-bold text-right header_desktop header_mobile ">
                    ثبت ملک جدید در خانه به دوش
                </div>
            </div>
        </div>
    );
}

class AddMelkForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            BuildingType: 'BuildingType',
            RentPrice: '',
            BasePrice: '',
            DealType: 'rent',
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

    handleSubmit(event) {
        this.setState({BuildingType: 'BuildingType'});
        this.setState({RentPrice: ''});
        this.setState({BasePrice: ''});
        this.setState({Address: ''});
        this.setState({PhoneNumber: ''});
        this.setState({Description: ''});
        this.setState({MaxMeter: ''});
        this.setState({DealType: 'rent'});
    }

    render(){
        return (
            <div class="container-fluid">
                <div class="row justify-content-center searchForm">
                    <form class="col-12 col-md-10 py-5">
                        <div class="form-row rtl shabnam ">
                            <div class="col-md-6 mb-2">
                                <DealType handleDealType={this.handleDealType} DealType={this.state.DealType}/>
                            </div>
                            <div class="col-md-6"></div>
                            <div class="form-row rtl my-md-1 shabnam justify-content-center">
                                <div class="form-group col-12 col-md-6">
                                    <BuildingType handleBuildingType={this.handleBuildingType} BuildingType={this.state.BuildingType}/>
                                </div>
                                <div class="form-group col-12 col-md-6">
                                    <MaxMeter handleMaxMeter={this.handleMaxMeter} MaxMeter={this.state.MaxMeter}/>
                                </div>

                                <div class="form-group col-12 col-md-6">
                                    <Address handleAddress={this.handleAddress} Address={this.state.Address} />
                                </div>
                                <div class="form-group col-12 col-md-6 ">
                                    <BasePrice handleBasePrice={this.handleBasePrice} BasePrice={this.state.BasePrice} />
                                </div>
                                <div class="form-group col-12 col-md-6">
                                    <PhoneNumber handlePhoneNumber={this.handlePhoneNumber} PhoneNumber={this.state.PhoneNumber}/>
                                </div>
                                <div class="form-group col-12 col-md-6">
                                    <RentPrice handleRentPrice={this.handleRentPrice} RentPrice={this.state.RentPrice} />
                                </div>

                                <div class="form-group col-12 col-md-12">
                                    <Description handleDescription={this.handleDescription} Description={this.state.Description}/>
                                </div>
                            </div>

                            <div class="col-md-8"></div>
                            <div class="col-12 col-md-4 py-3">
                                <button type="submit" class="btn btn-click-me text-center text-light khane-blue-background search-button"
                                        onSubmit={this.handleSubmit}>ثبت ملک</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        );
    }

}

class DealType extends React.Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.handleDealType(event.target.value);
    }

    render(){
        return(
            <div>
                <div className="form-check form-check-inline float-right">
                    <input class="form-check-input" type="radio" name="sellType" id="radio-rent" value="rent" onChange={this.handleChange} checked={this.props.DealType === 'rent'} />
                    <label class="form-check-label px-2 " for="radio-rent">
                        رهن و اجاره
                    </label>
                </div>
                <div className="form-check form-check-inline float-right">
                <input className="form-check-input" type="radio" name="sellType" id="radio-sell" value="sell" onChange={this.handleChange} checked={this.props.DealType === 'sell'}/>
                <label className="form-check-label px-2 " for="radio-sell">
                خرید
                </label>
                </div>
            </div>
        );
    }
}
class BuildingType extends React.Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.handleBuildingType(event.target.value);
    }

    render(){
        return(
            <div>
                <label class="form-check-label" ></label>
                <select class="form-control form-inline rtl shabnam" required value={this.props.BuildingType} onChange={this.handleChange}>
                <option value="BuildingType" disabled >نوع ملک</option>
                <option value="villa">ویلایی</option>
                <option value="apartment">آپارتمان</option>
                <option value="both">هر کدام</option>
                </select>
            </div>
        );
    }
}
class MaxMeter extends React.Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.handleMaxMeter(event.target.value);
    }

    render(){
        return(
            <div>
                <label class="form-check-label grey-color small">متر مربع</label>
                <input type="text" class="form-control form-inline rtl shabnam placeholder-grey"
                       placeholder="حداکثر متراژ" value={this.props.MaxMeter} onChange={this.handleChange}/>
            </div>
        );
    }
}
class Address extends React.Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.handleAddress(event.target.value);
    }

    render(){
        return(
            <div>
                <label class="form-check-label text-white small"></label>
                <input type="text" class="form-control form-inline rtl shabnam placeholder-grey"
                       placeholder="آدرس" value={this.props.Address} onChange={this.handleChange}/>
            </div>
        );
    }
}
class RentPrice extends React.Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.handleRentPrice(event.target.value);
    }

    render(){
        return(
            <div>
                <label class="form-check-label grey-color small">مترمربع</label>
                <input type="text" class="form-control form-inline rtl shabnam placeholder-grey"
                       placeholder="قیمت اجاره" value={this.props.RentPrice} onChange={this.handleChange}/>
            </div>
        );
    }
}
class BasePrice extends React.Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.handleBasePrice(event.target.value);
    }

    render(){
        return(
            <div>
                <label class="form-check-label grey-color small">مترمربع</label>
                <input type="text" class="form-control form-inline rtl shabnam placeholder-grey"
                       placeholder="قیمت رهن" value={this.props.BasePrice} onChange={this.handleChange}/>
            </div>
        );
    }
}
class PhoneNumber extends React.Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.handlePhoneNumber(event.target.value);
    }

    render(){
        return(
            <div>
                <label class="form-check-label text-white small" ></label>
                <input type="text" class="form-control form-inline rtl shabnam placeholder-grey"
                       placeholder="شماره تماس" value={this.props.PhoneNumber} onChange={this.handleChange}/>
            </div>
        );
    }
}
class Description extends React.Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.handleDescription(event.target.value);
    }
    render(){
        return(
            <div>
                <label class="form-check-label text-white small" ></label>
                <input type="text" class="form-control form-inline rtl shabnam placeholder-grey"
                       placeholder="توضیحات" value={this.props.Description} onChange={this.handleChange} />
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