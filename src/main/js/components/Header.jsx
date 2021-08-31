import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";

export class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header">
                <img className='header__logo' src='./images/logo_mtuci_blue.png' />
                <div className="header__main-text">
                    МТУСИ&nbsp;УЛС-2021
                </div>
                <FontAwesomeIcon
                    className='fa-3x header__right_content'
                    icon={faUserCircle}
                />
            </div>
        );
    }
}