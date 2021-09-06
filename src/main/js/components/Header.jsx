import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt, faUserCircle} from "@fortawesome/free-solid-svg-icons";

export class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header">
                <img className='header__logo' src='./images/logo_mtuci_violet.png' />
                <div className="header__main-text">
                    МТУСИ&nbsp;УЛС-2021
                </div>
                <div className='header__right_content'>
                    <FontAwesomeIcon
                        className='fa-3x mr-10'
                        icon={faUserCircle}
                    />
                    <div className='mr-30'>
                        <span className='header__user-name-text'>Тестовый Пользователь</span>
                    </div>
                    <FontAwesomeIcon
                        className='fa-2x'
                        icon={faSignOutAlt}
                    />
                </div>
            </div>
        );
    }
}