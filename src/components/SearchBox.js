import React from "react";
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css';
import '../HomePage/HomePage.css';
import '../shared-styles.css';
import '../reset.css'
import SearchForm from "./SearchForm";

class SearchBox extends React.Component{
    render(){
        return(
            <section className="container-fluid">
                <div className="row justify-content-center mb-2 searchForm">
                    <SearchForm numOfColumns={this.props.numOfColumns}/>
                </div>
                <div className="row justify-content-center mt-2 searchForm">
                        <div className={"col-11 col-md-"+ this.props.numOfColumns +" search-form shabnam rtl text-white text-center py-2"}>صاحب خانه هستید؟ خانه‌ی خود را ثبت کنید</div>
                </div>
                <br />
                <br />
            </section>
        );
    }
}
export default SearchBox;