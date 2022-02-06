import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faLevelUpAlt} from "@fortawesome/free-solid-svg-icons";
import {Link, withRouter} from "react-router-dom";
import "./LeftBar.css"
import {observer} from "mobx-react";
import {Tooltip} from "react-tippy";

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

        const {isReady, user, laboratoryIdentifiersAndNames } = this.props.applicationStore;
        const isAdministrationButtonVisible = isReady && (user ? user.isAdministrator : false);
        const {lastSelectedItemId} = this.state;

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
                        {laboratoryIdentifiersAndNames.map((item, index) => (
                            <div key={`laboratory${index}`}>
                                <Tooltip
                                    title={JSON.parse(`"${item.name}"`)}
                                    position='right'
                                >
                                    <Link className='undecorated-link' to={`/labs/${item.id}`}>
                                        <FontAwesomeIcon icon={faLevelUpAlt} rotation={90}/>
                                        &nbsp;
                                        <span id={`lab${item.id}`}
                                              className={lastSelectedItemId.localeCompare(`lab${item.id}`) === 0
                                                  ? 'left-bar__selected-item'
                                                  : ''
                                              }
                                              onClick={this.handleClickOnItem}
                                        >
                                    {`Работа #${index + 1}`}
                                </span>
                                    </Link>
                                </Tooltip>
                            </div>
                        ))}
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