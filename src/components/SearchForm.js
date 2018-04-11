import React from "react";
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css';
import '../shared-styles.css';
import '../reset.css'

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            BuildingType: '',
            Price: '',
            Area: '',
            DealType: '1',

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBuildingType = this.handleBuildingType.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.handleArea = this.handleArea.bind(this);
        this.handleDealType = this.handleDealType.bind(this);
    }

    handleBuildingType(input) {
        this.setState({BuildingType: input});
    }
    handlePrice(input) {
        this.setState({Price: input});
    }
    handleArea(input) {
        this.setState({Area: input});
    }
    handleDealType(input) {
        this.setState({DealType: input});
    }

    handleSubmit(event) {

        let url = 'http://localhost:8080/houses?' +
            'minArea=' + this.state.Area +
            '&buildingType=' + this.state.BuildingType +
            '&dealType=' + this.state.DealType +
            '&maxPrice=' + this.state.Price ;

        fetch(url)
            .then(this.checkStatus)
            .then((response) => response.json())
            .then(data => {
                this.props.handleHouses(data);
                console.log('form', data);
            })
            .catch(function(error) {
                console.log('request failed', error);
            });

        this.setState({BuildingType : ''});
        this.setState({Price : ''});
        this.setState({Area : ''});
        this.setState({DealType : '1'});



    }

    render() {
        return (
            <form className={"col-11 col-md-" + this.props.numOfColumns +" search-form py-md-4 py-2"}>
                <div className="form-row rtl my-md-1 shabnam justify-content-center px-md-3">
                    <BuildingTypeForm handleBuildingType={this.handleBuildingType} BuildingType={this.state.BuildingType} />
                    <PriceForm handlePrice={this.handlePrice} Price={this.state.Price} />
                    <AreaForm handleArea={this.handleArea} Area={this.state.Area} />
                </div>
                <div className="form-row rtl shabnam mt-2 mb-md-4 mb-2 justify-content-md-around px-md-3">
                    <div className="col-md-7 mb-2">
                        <DealType handleDealType={this.handleDealType} DealType={this.state.DealType} />
                    </div>
                    <div className="col-md-5">
                        <button type="button" onClick={this.handleSubmit}
                                className="btn btn-click-me text-center text-light khane-blue-background search-button">جست‌وجو
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default SearchForm;

class BuildingTypeForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.handleBuildingType(event.target.value);
    }

    render() {
        return (
            <div className="form-group col-12 col-md-4 pl-md-3">
                <label className="form-check-label px-2" ></label>
                <select className="form-control form-inline rtl shabnam" name="BuildingType" id="building-type"
                         value={this.props.BuildingType} onChange={this.handleChange}>
                    <option value="" disabled className="grey-color">نوع ملک</option>
                    <option value="villa">ویلایی</option>
                    <option value="apartment">آپارتمان</option>
                </select>
            </div>
        );
    }
}

class PriceForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.handlePrice(event.target.value);
    }

    render() {
        return (
            <div className="form-group col-12 col-md-4 px-md-3">
                <label className="form-check-label px-2 text-white small" >تومان</label>
                <input type="text" className="form-control form-inline rtl shabnam placeholder-grey"
                       id="price" name="maxPrice" placeholder="حداکثر قیمت" value={this.props.Price} onChange={this.handleChange}/>
            </div>
        );
    }
}

class AreaForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.handleArea(event.target.value);
    }

    render() {
        return (
            <div className="form-group col-12 col-md-4 pr-md-3 mb-0">
                <label className="form-check-label px-2 text-white small" >متر
                    مربع</label>
                <input type="text" className="form-control form-inline rtl shabnam placeholder-grey"
                       id="area" name="minArea" placeholder="حداقل متراژ" value={this.props.Area} onChange={this.handleChange} />
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
                    <label className="form-check-label px-2 text-white" >
                        رهن و اجاره
                    </label>
                </div>
                <div className="form-check form-check-inline float-right">
                    <input className="form-check-input" type="radio" name="dealType" value="0"
                           onChange={this.handleChange} checked={this.props.DealType === '0'}/>
                    <label className="form-check-label px-2 text-white" >
                        خرید
                    </label>
                </div>
            </div>
        );
    }
}