import React, {Component} from "react";
import {observer} from "mobx-react";
import "./LaboratoryPage.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faUpload} from "@fortawesome/free-solid-svg-icons";
import {Message} from "../domain/Message";
import {FirmwareQueue} from "./FirmwareQueue.jsx";
import {withRouter} from "react-router-dom";

@observer
class LaboratoryPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(!this.props.applicationStore.isReady) {
            return null;
        }
        const {
            videoStreamUrl, firmwareControllerUrl, maxFirmwareSize, labWorksControllerUrl, devices, deviceModes
        } = this.props.applicationStore;

        const currentDevice = devices[0];
        const currentDeviceMode = deviceModes.find(mode => mode.id === currentDevice.modeId);

        return (
            <div className='device-page'>
                <div className="half-screen">
                    {this.props.applicationStore.isReady &&
                    <DeviceControls
                        videoStreamUrl={videoStreamUrl}
                        firmwareUrl={firmwareControllerUrl}
                        maxFirmwareSize={maxFirmwareSize}
                        isVideoReady={this.props.applicationStore.isReady}
                        deviceMode={currentDeviceMode}
                    />
                    }
                </div>
                <div className="half-screen">
                    {this.props.applicationStore.isReady &&
                    <Description
                        laboratoryId={this.props.match.params.laboratoryId}
                        labWorksControllerUrl={labWorksControllerUrl}
                    />
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(LaboratoryPage);

@observer
class DeviceControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
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
        if(files.length !== 1) {
            console.error("You should upload only one file!");
            this.addMessage("?????? ???????????????? ???????????????? ?????????? ???????????? ???????????? ??????????");
        }

        const requestBody = new FormData();
        const file = files[0];
        requestBody.append('file', file, file.name);

        fetch(`${this.props.firmwareUrl}/upload`, {
            method: 'POST',
            credentials: 'same-origin',
            body: requestBody,
        }).then(response => {
            if (response.ok) {
                return response.text();
            } else {
                if (response.status === 400) {
                    this.addMessage('???????????????? ???????????? ??????????', '????????????:');
                    throw new Error("???????????????? ???????????? ??????????");
                } else if (response.status === 417) {
                    const maxSize = this.convertFileSize(this.props.maxFirmwareSize);
                    const maxSizeLimitString = `(???????????????????????? ???????????????????? ???????????? ??????????: ${maxSize})`;
                    const text = '???????????????? ???????????????????????? ???????????? ?????????? ' + maxSizeLimitString;
                    this.addMessage(text,'????????????:');
                    throw new Error("???????????????? ???????????????????????? ???????????? ??????????");
                } else if (response.status === 500) {
                    this.addMessage('???????????? ?????? ???????????????? ??????????', '????????????:');
                    throw new Error("???????????? ?????? ???????????????? ??????????");
                }
            }
            return response.text();
        }).then(text => {
            this.addMessage(`???????????????? ?????????????? ??????????????????. ?????????????????????????? ????????????????: ${text}`);
        }).catch(error => {
            console.error(error);
        });
    }

    addMessage = (messageText, prefix) => {
        const message = new Message(messageText, prefix);
        this.setState({messages: this.state.messages.concat(message)});
    }

    convertFileSize = (fileSizeString) => {
        const unitsTranslation = { B: '??', KB: '????', MB: '????', GB: '????' };
        const size = fileSizeString.match(/\d+/)[0];
        const sizeUnits = fileSizeString.match(/\D+/)[0];
        return `${size} ${unitsTranslation[sizeUnits]}`;
    }

    render() {
        const poster = "../images/waiting-for-video.gif";

        return (
            <div className="video-player-bar">
                <FirmwareQueue
                    firmwareControllerUrl={this.props.firmwareUrl}
                    deviceMode={this.props.deviceMode}
                />
                <video className="video-player" autoPlay={true} controls={false} poster={poster} muted={true}>
                    {this.props.isVideoReady &&
                    <source src={this.props.videoStreamUrl} type="video/webm"/>
                    }
                    ?????? ?????????????? ???? ???????????????????????? ?????????? ?? ?????????????? HTML5
                </video>
                <div className='log-area'>
                    <p>???????????? ??????????????????:</p>
                    <textarea
                        className='w-100'
                        rows={10}
                        readOnly={true}
                        value={this.state.messages.map(message => `${message.toLocaleString()}`).join('\n')}
                    />
                </div>
                <button
                    className="btn btn-outline-success upload-button"
                    onClick={this.handleUploadButtonClick}
                    disabled={!this.props.deviceMode.firmwareUploadingEnabled}
                >
                    <FontAwesomeIcon icon={faUpload}/>
                    &nbsp;
                    ?????????????????? ????????????????
                </button>
            </div>
        );
    }
}

@observer
class Description extends Component {
    constructor(props) {
        super(props);
        this.state = {
            laboratory: undefined
        };
    }

    componentDidMount() {
        this.fetchData(this.props.laboratoryId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.laboratoryId !== prevProps.laboratoryId) {
            this.fetchData(this.props.laboratoryId);
        }
    }

    fetchData = (id) => {
        const url = `${this.props.labWorksControllerUrl}/${id}`;

        fetch(url, {
            method: 'GET',
            mode: 'same-origin',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Server responds with " + response.status);
            }
        }).then(json => {
            this.setState({laboratory : json});
        }).catch(error => {
            console.error(error);
        });
    }

    handleDownloadButtonClick = () => {

        fetch(`${this.props.labWorksControllerUrl}/download/${this.props.laboratoryId}`, {
            method: "GET",
            mode: "same-origin",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/x-octet-stream'
            }
        }).then(response => {
            if(response.ok) {
                return response.blob();
            } else {
                throw new Error('Server responded with status ' + response.status);
            }
        }).then(blob => {
            // Maybe, it would rather use FileSaver.js or StreamSaver.js instead of this code.
            const url = window.URL.createObjectURL(
                new Blob([blob], {type: 'octet/stream'})
            );

            const link = document.createElement('a');
            link.href = url;
            const fileName = this.state.laboratory ? this.state.laboratory.displayedFileName : 'file';
            link.setAttribute('download', fileName);

            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();

            // Clean up and remove the link
            window.URL.revokeObjectURL(url);
        }).catch(error => {
            console.error(error);
        });
    }

    render() {
        const labWorkName = JSON.parse(`"${this.state.laboratory ? this.state.laboratory.name : ''}"`);

        const labWorkGoal = JSON.parse(`"${this.state.laboratory ? this.state.laboratory.goal : ''}"`);

        const labWorkExecutionSteps = (this.state.laboratory ? this.state.laboratory.description.executionOrder : []);

        return (
            <div className='lab-description'>
                <div className='w-100 description__header'>
                    <h2 className='mt-0 white-spaces__break-spaces'>
                        {labWorkName}
                    </h2>
                </div>
                <div className='description__goal-block'>
                    <label htmlFor='labWorkGoal'>
                        <b>???????? ????????????:</b>
                    </label>
                    <p id='labWorkGoal' className='white-spaces__break-spaces mb-0'>
                        {labWorkGoal}
                    </p>
                </div>
                <div className='description__execution-order'>
                    <label>
                        <b>?????????????? ????????????????????:</b>
                    </label>
                    <ol>
                        {labWorkExecutionSteps.map((stepDescription, index) => (
                            <li key={`executionStep${index}`} className='description-list'>
                                {stepDescription}
                            </li>
                        ))}
                    </ol>
                </div>
                <button
                    className="btn btn-outline-primary download-button"
                    onClick={this.handleDownloadButtonClick}
                >
                    <FontAwesomeIcon icon={faDownload}/>
                    &nbsp;
                    ?????????????? ??????????????????
                </button>
            </div>
        );
    }
}

