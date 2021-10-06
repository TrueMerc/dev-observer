import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLevelUpAlt} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

export class LeftBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastSelectedItemId: 'lab1'
        };
    }

    handleClickOnItem = (event) => {
        this.setState({lastSelectedItemId: event.target.id});
    }

    render() {
        return (
            <div className="left-bar">
                <div className='task-list'>
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
                    <div className='ml-15 mt-5'>
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
            </div>
        );
    }
}