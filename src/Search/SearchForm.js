import React from "react";
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css';
import '../shared-styles.css';
import '../reset.css'

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form className="col-11 col-md-8 search-form py-md-4 py-2">
                <div className="form-row rtl my-md-1 shabnam justify-content-center px-md-3">
                    <BuildingTypeForm/>
                    <PriceForm/>
                    <AreaForm/>
                </div>
                <div className="form-row rtl shabnam mt-2 mb-md-4 mb-2 justify-content-md-around px-md-3">
                    <div className="col-md-7 mb-2">
                        <DealType/>
                    </div>
                    <div className="col-md-5">
                        <button type="button"
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
    }

    render() {
        return (
            <div className="form-group col-12 col-md-4 pl-md-3">
                <label className="form-check-label px-2" for="building-type"></label>
                <select className="form-control form-inline rtl shabnam" id="building-type"
                        required>
                    <option value="" disabled selected className="grey-color">نوع ملک</option>
                    <option value="villa">ویلایی</option>
                    <option value="apartment">آپارتمان</option>
                    <option value="both">هر کدام</option>
                </select>
            </div>
        );
    }
}

class PriceForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="form-group col-12 col-md-4 px-md-3">
                <label className="form-check-label px-2 text-white small" for="price">تومان</label>
                <input type="text" className="form-control form-inline rtl shabnam placeholder-grey"
                       id="price" placeholder="حداکثر قیمت"/>
            </div>
        );
    }
}

class AreaForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="form-group col-12 col-md-4 pr-md-3 mb-0">
                <label className="form-check-label px-2 text-white small" for="area">متر
                    مربع</label>
                <input type="text" className="form-control form-inline rtl shabnam placeholder-grey"
                       id="area" placeholder="حداکثر متراژ"/>
            </div>
        );
    }
}

class DealType extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="form-check form-check-inline float-right">
                    <input className="form-check-input" type="radio" name="sellType" id="radio-rent"
                           value="rent" checked/>
                    <label className="form-check-label px-2 text-white" for="radio-rent">
                        رهن و اجاره
                    </label>
                </div>
                <div className="form-check form-check-inline float-right">
                    <input className="form-check-input" type="radio" name="sellType" id="radio-sell" value="sell"/>
                    <label className="form-check-label px-2 text-white" for="radio-sell">
                        خرید
                    </label>
                </div>
            </div>
        );
    }
}