import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLevelUpAlt} from "@fortawesome/free-solid-svg-icons";

export class LeftBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="left-bar">
                <div className='task-list'>
                    <p>Главная</p>
                    <p>Лабораторные работы</p>
                    <span className='ml-10'>
                        <FontAwesomeIcon icon={faLevelUpAlt} rotation={90}/>
                        &nbsp;
                        УЛС-2021
                    </span>

                </div>
            </div>
        );
    }
}