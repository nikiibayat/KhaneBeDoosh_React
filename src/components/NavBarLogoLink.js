import React from "react";
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css';
import '../shared-styles.css';
import logo from '../assets/logo.png';
import '../reset.css'

class NavBarLogoLink extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <a className="navbar-brand shabnam" href="../HomePage/homepage.html">
                <img src={logo} width="30" height="30" className="d-inline-block align-top" alt=""/>
                <span className="khane-blue font-weight-bold">خانه‌به‌دوش</span>
            </a>
        );
    }
}

export default NavBarLogoLink;