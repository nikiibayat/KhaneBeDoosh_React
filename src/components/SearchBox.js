import React from "react";
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css';
import '../HomePage/HomePage.css';
import '../shared-styles.css';
import '../reset.css'
import SearchForm from "./SearchForm";
import {Link} from 'react-router-dom';


class SearchBox extends React.Component {
    render() {
        return (
            <section className="container-fluid">
                <div className="row justify-content-center mb-2">
                    <SearchForm numOfColumns={this.props.numOfColumns} handleHouses={this.props.handleHouses}/>
                </div>
                <Link to='/addHouse'>
                    <div className="row justify-content-center mt-2">
                        <div
                            className={"col-11 col-md-" + this.props.numOfColumns + " search-form shabnam rtl text-white text-center py-2"}>صاحب
                            خانه هستید؟ خانه‌ی خود را ثبت کنید
                        </div>
                    </div>
                </Link>

                <br/>
                <br/>
            </section>
        );
    }
}

export default SearchBox;