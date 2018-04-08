import React from "react";
import NavBarDropdown from "../components/NavBarDropdown";

class utils extends React.Component {
    constructor(props){
        super(props);

        this.checkStatus = this.checkStatus.bind(this);
        this.parseJSON = this.parseJSON.bind(this);

    }

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
    parseJSON(response) {
        return response.json()
    }


    render() {
    return(null);
    }
}

export default utils.checkStatus;