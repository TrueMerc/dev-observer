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
                    <div>
                        <p>
                            <b className='underlined'>УЛС-2021</b>
                        </p>
                    </div>
                    <div className='ml-15 mt-5'>
                        <p>
                            <FontAwesomeIcon icon={faLevelUpAlt} rotation={90}/>
                            &nbsp;
                            {/*<b className='underlined'>Работа #1</b>*/}
                            Работа #1
                        </p>
                    </div>
                    <div className='ml-15 mt-5'>
                        <p>
                            <FontAwesomeIcon icon={faLevelUpAlt} rotation={90}/>
                            &nbsp;
                            Работа #2
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}