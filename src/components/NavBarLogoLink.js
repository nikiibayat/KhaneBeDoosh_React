import React from "react";
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css';
import '../shared-styles.css';
import logo from '../assets/logo.png';
import '../reset.css';
import {Link} from 'react-router-dom';


class NavBarLogoLink extends React.Component{
    render(){
        return(
            <Link className="navbar-brand shabnam" to="/">
                <img src={logo} width="30" height="30" className="d-inline-block align-top" alt=""/>
                <span className="khane-blue font-weight-bold">خانه‌به‌دوش</span>
            </Link>
        );
    }
}

export default NavBarLogoLink;