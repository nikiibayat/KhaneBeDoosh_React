import React from "react";
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css';
import '../shared-styles.css';
import '../reset.css'

class PageTitleHeader extends React.Component{
    render(){
        return(
            <div className="container-fluid">
                <div className="row rtl">
                    <div className="shabnam khane-blue font-weight-bold text-right header_desktop header_mobile">{this.props.text}</div>
                </div>
            </div>
        );
    }
}
export default PageTitleHeader;