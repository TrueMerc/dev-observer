import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faLevelUpAlt} from "@fortawesome/free-solid-svg-icons";
import {Link, withRouter} from "react-router-dom";
import "./LeftBar.css"
import {observer} from "mobx-react";

@observer
class LeftBarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastSelectedItemId: 'lab1'
        };
    }

    handleClickOnItem = (event) => {
        this.setState({lastSelectedItemId: event.target.id});
    }

    handleAdministrationButtonClick = (event) => {
        this.props.history.push('/Administration');
    }

    render() {

        const {isReady, user} = this.props.applicationStore;
        const isAdministrationButtonVisible = isReady && (user ? user.isAdministrator : false);

        return (
            <div className="left-bar">
                <div className='left-bar__device-list'>
                    <div>
                        <Link className='undecorated-link' to="/description">
                            <span id='device'
                                  className={this.state.lastSelectedItemId.localeCompare('device') === 0
                                      ? 'left-bar__selected-item'
                                      : ''
                                  }
                                  onClick={this.handleClickOnItem}
                            >
                                УЛС-2021
                            </span>
                        </Link>
                    </div>
                    <div className='left-bar__device-list-lab-item'>
                        <Link className='undecorated-link' to="/">
                            <FontAwesomeIcon icon={faLevelUpAlt} rotation={90}/>
                            &nbsp;
                            <span id='lab1'
                                  className={this.state.lastSelectedItemId.localeCompare('lab1') === 0
                                      ? 'left-bar__selected-item'
                                      : ''
                                  }
                                  onClick={this.handleClickOnItem}
                            >
                                Работа #1
                            </span>
                        </Link>
                    </div>
                </div>
                {isAdministrationButtonVisible &&
                <button
                    className='btn btn-outline-secondary left-bar__administration-button'
                    onClick={this.handleAdministrationButtonClick}
                >
                    <span>
                        <FontAwesomeIcon icon={faCog}/>
                        &nbsp;
                        Администрирование
                    </span>
                </button>
                }
            </div>
        );
    }
}

export const LeftBar = withRouter(LeftBarComponent);