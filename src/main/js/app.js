import {Component, Fragment} from "react";

const React = require('react');
const ReactDOM = require('react-dom');

class Application extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <div className="content">
                    <LeftBar/>
                    <MainContent
                        sourceUrl="http://localhost:8080/stream"
                    />
                </div>
            </Fragment>
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
                <video className="video-player" autoPlay={true} controls={true}>
                    <source src={this.props.sourceUrl} type="video/mp4"/>
                    Ваш браузер не поддерживает видео в формате HTML5
                </video>
            </div>
        );
    }
}

ReactDOM.render(
    <Application/>,
    document.getElementById("react")
);

