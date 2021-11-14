import React, {Component} from "react";
import {observer} from "mobx-react";
import "./LabWorkPage.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUpload} from "@fortawesome/free-solid-svg-icons";
import {Message} from "../domain/Message";
import {FirmwareQueue} from "./FirmwareQueue.jsx";

@observer
export default class LabWorkPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(!this.props.applicationStore.isReady) {
            return null;
        }
        const { videoStreamUrl, firmwareControllerUrl, maxFirmwareSize } = this.props.applicationStore;
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
                    <Description/>
                </div>
            </div>
        );
    }
}

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
        const poster = "./images/video-stream-play.png";
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

class Description extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const labWorkName = "ИЗУЧЕНИЕ ПРОГРАММНОГО ОБЕСПЕЧЕНИЯ СТЕНДА.\n"
            + "ЗНАКОМСТВО С АРХИТЕКТУРОЙ МИКРОКОНТРОЛЛЕРА ARM";

        const labWorkGoal = "Введение в разработку проектов для учебно-лабораторного стенда " +
            "с процессором ARM Cortex-M7, " +
            "ознакомление со структурой лабораторного стенда, изучение принципов работы с портами " +
            "ввода/вывода микроконтроллера.";

        const labWorkExecutionSteps = [
            "Подключите лабораторный стенд к компьютеру, используя программатор ST-Link.",
            "Подключите блок питания к лабораторному стенду.",
            "Скопируйте папку проекта ULS_LAB1 в рабочий каталог.",
            "Откройте проект ULS_LAB1. Для этого зайдите в папку проекта ULS_LAB1, далее, зайдите в " +
            "каталог EWARM и кликните на файл проекта Project.eww. Будет запущена интегрированная среда " +
            "разработки IAR WORKBENCH.",
            "Изучите интерфейс среды разработки IAR WORKBENCH.",
            "Изучите текст программы проекта. Откомпилируйте проект, загрузите в микроконтроллер при " +
            "помощи среды разработки и запустите. Убедитесь, что программа работает.",
            "Найдите определение новых типов данных, имен, констант и структур:\n" +
            "uint32_t, GPIOH, MODER, GPIO_ODR_ODR_7, GPIO_ODR_ODR_6, GPIO_ODR_ODR_4, delay_ms,\n" +
            "LED_D1_SET, LED_D2_SET, LED_D3_SET;\n" +
            "Запишите для каждого имени: имя файла, где описана константа, её тип, разрядность и\n" +
            "значение.",
            "Измените код программы так, чтобы режим мигания светодиодов соответствовал выданному варианту, " +
            "приведенному в таблице 1.",
            "Скомпилируйте измененный проект и загрузите его в микроконтроллер при помощи среды IAR WORKBENCH.",
            "Убедитесь, что полученный результат соответствует заданию.",
            "Покажите преподавателю стенд с работающей программой.",
            "Сохраните исходный код программы для составления отчета.",
            "Подготовьте и защитите отчет."
        ];

        const labWorkVariants = [
            "D1 мигает, D2 и D3 потушены",
            "D1 и D2 мигают синхронно, D2 потушен",
            "D1, D2 и D3 мигают синхронно",
            "D1 горит, D2 и D3 мигают синхронно",
            "D1 и D2 горят постоянно, D3 мигает",
            "D1, D2 и D3 горят постоянно",
            "D1 потушен, D2 и D3 мигают асинхронно",
            "D3 горит постоянно, D1 мигает, D2 потушен",
            "D1 мигает, D2 и D3 горят постоянно",
            "D1 и D2 мигают асинхронно, D3 потушен"
        ];

        return (
            <div className='w-100'>
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
                    <label>
                        <b>Варианты заданий</b>
                    </label>
                    <table className='description__table'>
                        <thead>
                        <tr>
                            <th className='description__table-element wp-100 variant-table__table-header'>
                                <b>Вариант</b>
                            </th>
                            <th className='description__table-element variant-table__table-header'>
                                <b>Режим работ светодиодов</b>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {labWorkVariants.map((variant, index) => (
                            <tr>
                                <td className='description__table-element center-aligned'>
                                    {index + 1}
                                </td>
                                <td className='description__table-element pl-5'>
                                    {variant}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}