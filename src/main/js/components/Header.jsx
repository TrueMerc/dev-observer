import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {Tooltip} from "react-tippy";
import {observer} from "mobx-react";
import {ApplicationStore} from "../store/ApplicationStore";

@observer
export class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const userFullName = this.props.applicationStore.user
            ? this.props.applicationStore.user.lastNameWithInitials()
            : '';

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
                        <span className='header__user-name-text'>
                            {userFullName}
                        </span>
                    </div>
                    <Tooltip html={
                        <div className='header__tooltip'>
                            Выйти
                        </div>
                    }>
                        <button
                            className='header__button'
                            onClick={(event) => {
                                event.preventDefault();
                                fetch('/logout', {
                                    method: 'GET',
                                    mode: 'same-origin',
                                    credentials: 'same-origin',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }).then(() => {
                                    window.location.href='/login';
                                })
                            }}
                        >
                            <FontAwesomeIcon
                                className='fa-2x'
                                icon={faSignOutAlt}
                            />
                        </button>
                    </Tooltip>
                </div>
            </div>
        );
    }
}