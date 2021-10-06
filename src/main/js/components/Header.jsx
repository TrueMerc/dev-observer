import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {Tooltip} from "react-tippy";
import {observer} from "mobx-react";
import {Link} from "react-router-dom";

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
                <img
                    className='header__logo'
                    src='./images/logo_mtuci_violet.png'
                    onClick={() => { window.open('https://mtuci.ru'); } }
                />
                <div className="header__main-text">
                    МТУСИ&nbsp;УЛС-2021
                </div>
                <div className='header__right_content'>
                    <Tooltip title='Профиль пользователя'>
                        <Link className='header__link' to="/profile">
                            <FontAwesomeIcon
                                className='fa-3x mr-10'
                                icon={faUserCircle}
                            />
                        </Link>
                    </Tooltip>
                    <div className='mr-30'>
                        <span className='header__user-name-text'>
                            {userFullName}
                        </span>
                    </div>
                    <Tooltip title='Выйти'>
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