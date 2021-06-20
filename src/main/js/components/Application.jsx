import React from "react";
import { Component } from "react";
import { ApplicationStore } from "../store/ApplicationStore";
import { observer } from  "mobx-react";


@observer
export default class Application extends Component {

    constructor(props) {
        super(props);
        this.applicationStore = new ApplicationStore(document.documentURI);
    }

    componentDidMount() {
        this.applicationStore.loadSettings();
    }

    render() {
        if(!this.applicationStore.isReady) {
            return null;
        }
        const { videoStreamUrl, firmwareControllerUrl } = this.applicationStore;
        console.log(videoStreamUrl);
        console.log(firmwareControllerUrl);
        return (
            <>
                <Header/>
                <div className="content">
                    <LeftBar/>
                    <MainContent
                        sourceUrl={videoStreamUrl}
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
        const poster = "./images/video-stream-play.png";

        return (
            <div className="main-content">
                <video className="video-player" controls={true} autoPlay={true} poster={poster}>
                    <source src={this.props.sourceUrl} type="video/ogg"/>
                    Ваш браузер не поддерживает видео в формате HTML5
                </video>
            </div>
        );
    }
}