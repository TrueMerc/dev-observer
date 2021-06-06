import React from "react";
import { Component } from "react";

export default class Application extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Header/>
                <div className="content">
                    <LeftBar/>
                    <MainContent
                        sourceUrl="http://localhost:8081/stream"
                    />
                </div>
            </>
        );
    }
}

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header">
                <div className="header__main-text">
                    Модуль управления платой
                </div>
            </div>
        );
    }
}

class LeftBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="left-content">
            Панель пользователей
        </div>
    }
}

class MainContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main-content">
                <video className="video-player" controls={true} autoPlay={true}>
                    <source src={this.props.sourceUrl} type="video/ogg"/>
                    Ваш браузер не поддерживает видео в формате HTML5
                </video>
            </div>
        );
    }
}