import React, {Component} from "react";
import {observer} from "mobx-react";
import {ApplicationStore} from "../store/ApplicationStore";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileUpload} from "@fortawesome/free-solid-svg-icons";

@observer
export default class DevicePage extends Component {

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
            <div className='device-page'>
                <div className="half-screen">
                    <MainContent
                        videoStreamUrl={videoStreamUrl}
                        firmwareUrl={firmwareControllerUrl}
                    />
                </div>
                <div className="half-screen">
                    <h2>Описание</h2>
                </div>
            </div>
        );
    }
}

class MainContent extends Component {
    constructor(props) {
        super(props);
    }

    handleUploadButtonClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = false;
        input.onchange = () => {
            this.handleFirmwareUpload(Array.from(input.files));
        }
        input.click();
    }

    handleFirmwareUpload = (files) => {
        console.log(files);

        if(files.length !== 1) {
            console.error("You should upload only one file!");
        }

        const requestBody = new FormData();
        const file = files[0];
        let start = 0, end = requestBody.append('file', file, file.name);
        console.log(this.props.firmwareUrl);
        const uploadUrl = new URL('upload', this.props.firmwareUrl);
        console.log(uploadUrl);
        fetch(`${this.props.firmwareUrl}/upload`, {
            method: 'POST',
            credentials: 'same-origin',
            body: requestBody,
        }).then(response => {
            if (response.ok) {
                console.log(response);
                //Tools.toastSuccess("Распознавание выполнено", id);
            } else {
                console.warn("Response status: " + response.status);
                if (response.status === 400) {
                    // Tools.toastError("Неверный формат файла", id);
                    console.error("Неверный формат файла");
                } else if (response.status === 417) {
                    console.error("Превышен максимальный размер файла");
                    // Tools.toastError("Превышен максимальный размер файла", id);
                } else if (response.status === 500) {
                    // Tools.toastError("Ошибка при загрузке файла", id);
                    console.error("Ошибка при загрузке файла");
                }
            }
            return response.text();
        }).then(text => {
            console.log(text);
            //this.setState({recognizedText: text.toString()});

        }).catch(error => {
            console.error(error);
            //Tools.toastSuccess("Ошибка распознавания документа", id);
        });
    }

    render() {
        const poster = "./images/video-stream-play.png";

        return (
            <div className="video-player-bar">
                <video className="video-player" controls={true} autoPlay={true} poster={poster}>
                    <source src={this.props.videoStreamUrl} type="video/ogg"/>
                    Ваш браузер не поддерживает видео в формате HTML5
                </video>
                <div className='log-area'>
                    <p>Журнал сообщений:</p>
                    <textarea className='w-100' rows={10} />
                </div>
                <button
                    className="upload-button"
                    onClick={this.handleUploadButtonClick}
                >
                    <span>
                        Загрузить прошивку
                    </span>
                </button>
            </div>
        );
    }
}