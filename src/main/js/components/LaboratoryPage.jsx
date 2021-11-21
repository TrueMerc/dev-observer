import React, {Component} from "react";
import {observer} from "mobx-react";
import "./LabWorkPage.css";
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
            videoStreamUrl, firmwareControllerUrl, maxFirmwareSize, labWorksControllerUrl
        } = this.props.applicationStore;
        return (
            <div className='device-page'>
                <div className="half-screen">
                    {this.props.applicationStore.isReady &&
                    <DeviceControls
                        videoStreamUrl={videoStreamUrl}
                        firmwareUrl={firmwareControllerUrl}
                        maxFirmwareSize={maxFirmwareSize}
                        isVideoReady={this.props.applicationStore.isReady}
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
            this.addMessage("Для загрузки допустим выбор только одного файла");
        }

        const requestBody = new FormData();
        const file = files[0];
        requestBody.append('file', file, file.name);
        const uploadUrl = new URL('upload', this.props.firmwareUrl);
        fetch(`${this.props.firmwareUrl}/upload`, {
            method: 'POST',
            credentials: 'same-origin',
            body: requestBody,
        }).then(response => {
            if (response.ok) {
                return response.text();
            } else {
                if (response.status === 400) {
                    this.addMessage('Неверный формат файла', 'ОШИБКА:');
                    throw new Error("Неверный формат файла");
                } else if (response.status === 417) {
                    const maxSize = this.convertFileSize(this.props.maxFirmwareSize);
                    const maxSizeLimitString = `(максимальный допустимый размер файла: ${maxSize})`;
                    const text = 'Превышен максимальный размер файла ' + maxSizeLimitString;
                    this.addMessage(text,'ОШИБКА:');
                    throw new Error("Превышен максимальный размер файла");
                } else if (response.status === 500) {
                    this.addMessage('Ошибка при загрузке файла', 'ОШИБКА:');
                    throw new Error("Ошибка при загрузке файла");
                }
            }
            return response.text();
        }).then(text => {
            console.log(text);
            this.addMessage(`Прошивка успешно загружена. Идентификатор прошивки: ${text}`);
        }).catch(error => {
            console.error(error);
        });
    }

    addMessage = (messageText, prefix) => {
        const message = new Message(messageText, prefix);
        this.setState({messages: this.state.messages.concat(message)});
    }

    convertFileSize = (fileSizeString) => {
        const unitsTranslation = { B: 'Б', KB: 'КБ', MB: 'МБ', GB: 'ГБ' };
        const size = fileSizeString.match(/\d+/)[0];
        const sizeUnits = fileSizeString.match(/\D+/)[0];
        return `${size} ${unitsTranslation[sizeUnits]}`;
    }

    render() {
        const poster = "../images/video-stream-play.png";
        console.log("Stream URL");
        console.log(this.props.videoStreamUrl);
        console.log(this.props.isVideoReady);

        return (
            <div className="video-player-bar">
                <FirmwareQueue firmwareControllerUrl={this.props.firmwareUrl}/>
                <video className="video-player" autoPlay={true} controls={false} poster={poster} muted={true}>
                    {this.props.isVideoReady &&
                    <source src={this.props.videoStreamUrl} type="video/webm"/>
                    }
                    Ваш браузер не поддерживает видео в формате HTML5
                </video>
                <div className='log-area'>
                    <p>Журнал сообщений:</p>
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
                >
                    <FontAwesomeIcon icon={faUpload}/>
                    &nbsp;
                    Загрузить прошивку
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
        const id = this.props.laboratoryId;
        const url = `${this.props.labWorksControllerUrl}/${id}`;
        console.log(url);
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
            console.log(json);
            this.setState({laboratory : json});
        }).catch(error => {
           console.log(error);
        });
    }

    handleDownloadButtonClick = () => {
        console.log(this.props.labWorksControllerUrl);
        fetch(`${this.props.labWorksControllerUrl}/download/${this.props.laboratoryId}`, {
            method: "GET",
            mode: "same-origin",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/x-octet-stream'
            }
        }).then(response => {
            if(response.ok) {
                console.log(response);
                return response.blob();
            } else {
                throw new Error('Server responded with status ' + response.status);
            }
        }).then(blob => {
            // Maybe, it would rather use FileSaver.js or StreamSaver.js instead of this code.
            console.log(blob);
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
        const labWorkName = this.state.laboratory ? this.state.laboratory.name : '';

        const labWorkGoal = this.state.laboratory ? this.state.laboratory.goal : '';

        const labWorkExecutionSteps = [
            "Скачайте с сайта УЛС-2021 комплект учебно-методических материалов, необходимых для выполнения " +
            "лабораторной работы.",
            "Скопируйте папку ULS_LAB1_dynamic_indication (из комплекта материалов) в рабочий каталог. " +
            "Путь к каталогу не должен содержать русских символов.",
            "Создайте проект dynamic_indication в папке ULS_LAB1_dynamic_indication при помощи системы " +
            "автоматизированного проектирования Xilinx ISE Web Pack (см.\u00A0методические указания пункт 1).",
            "Из папки ULS_LAB1_dynamic_indication добавьте в проект модули:\n" +
            "debounce.vhd, multiple_driver_x2.vhd, top.vhd, UART_RX.vhd.",
            "Создайте модуль счётчика тактовых импульсов с названием counter, который понадобится для реализации счёта "
            + "времени в секундах, а также для процесса динамической индикации.",
            "Создайте модуль дешифратора для семисегментного цифрового индикатора с названием seven_segm_ind, " +
            "который должен преобразовывать входные целочисленные значения в 8-битный вектор логических нулей и " +
            "единиц.",
            "Изучите текст программы проекта. Внесите свои изменения в модуль top.vhd согласно выданному варианту.",
            "Создайте файл связи с выводами отладочной платы, который должен соответствовать вашему варианту " +
            "(Implementation Constraints File).",
            "Скомпилируйте проект и загрузите файл с расширением *.bit на сайт УЛС-2021 (лабораторная работа №1) " +
            "для проверки его работоспособности.",
            "Убедитесь, что полученный результат соответствует заданному варианту.",
            "Сохраните полученный код программы и сделайте фотоотчет работы проекта на лабораторном стенде " +
            "для составления отчета."
        ];

        return (
            <div className='lab-description'>
                <div className='w-100 description__header'>
                    <h2 className='mt-0 white-spaces__break-spaces'>
                        {labWorkName}
                    </h2>
                </div>
                <div className='description__goal-block'>
                    <label htmlFor='labWorkGoal'>
                        <b>Цель работы:</b>
                    </label>
                    <p id='labWorkGoal' className='white-spaces__break-spaces mb-0'>
                        {labWorkGoal}
                    </p>
                </div>
                <div className='description__execution-order'>
                    <label>
                        <b>Порядок выполнения:</b>
                    </label>
                    <ol>
                        {labWorkExecutionSteps.map(stepDescription => (
                            <li className='description-list'>
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
                    Скачать материалы
                </button>
            </div>
        );
    }
}

