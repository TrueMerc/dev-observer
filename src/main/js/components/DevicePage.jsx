import React, {Component} from "react";
import {observer} from "mobx-react";
import "./DevicePage.css";

@observer
export default class DevicePage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if(!this.props.applicationStore.isReady) {
            return null;
        }
        const { videoStreamUrl, firmwareControllerUrl } = this.props.applicationStore;
        return (
            <div className='device-page'>
                <div className="half-screen">
                    <DeviceControls
                        videoStreamUrl={videoStreamUrl}
                        firmwareUrl={firmwareControllerUrl}
                    />
                </div>
                <div className="half-screen">
                    <Description/>
                </div>
            </div>
        );
    }
}

class DeviceControls extends Component {
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
        requestBody.append('file', file, file.name);
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
            } else {
                console.warn("Response status: " + response.status);
                if (response.status === 400) {
                    console.error("Неверный формат файла");
                } else if (response.status === 417) {
                    console.error("Превышен максимальный размер файла");
                } else if (response.status === 500) {
                    console.error("Ошибка при загрузке файла");
                }
            }
            return response.text();
        }).then(text => {
            console.log(text);
        }).catch(error => {
            console.error(error);
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

class Description extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='w-100'>
                <div className='w-100 description__header'>
                    <h2 className='mt-0'>
                        ИЗУЧЕНИЕ ПРОГРАММНОГО И АППАРАТНОГО ОБЕСПЕЧЕНИЯ СТЕНДА. <br/>
                        ЗНАКОМСТВО С АРХИТЕКТУРОЙ МИКРОКОНТРОЛЛЕРА ARM
                    </h2>
                </div>
                <div className='description__goal-block'>
                    <label>
                        <b>Цель работы:</b>
                    </label>
                    <p>
                        Введение в разработку проектов для учебно-лабораторного стенда с процессором ARM Cortex-M7,
                        ознакомление со структурой лабораторного стенда, изучение принципов работы с портами
                        ввода/вывода микроконтроллера.
                    </p>
                </div>
                <div className='description__execution-order'>
                    <label>
                        <b>Порядок выполнения:</b>
                    </label>
                    <ol>
                        <li className='description-list'>
                            Подключите лабораторный стенд к компьютеру, используя программатор ST-Link.
                        </li>
                        <li className='description-list'>
                            Подключите блок питания к лабораторному стенду.
                        </li>
                        <li className='description-list'>
                            Скопируйте папку проекта ULS_LAB1 в рабочий каталог.
                        </li>
                        <li className='description-list'>
                            Откройте проект ULS_LAB1. Для этого зайдите в папку проекта ULS_LAB1, далее, зайдите в
                            каталог EWARM и кликните на файл проекта Project.eww. Будет запущена интегрированная среда
                            разработки IAR WORKBENCH.
                        </li>
                        <li className='description-list'>
                            Изучите интерфейс среды разработки IAR WORKBENCH.
                        </li>
                        <li className='description-list'>
                            Изучите текст программы проекта. Откомпилируйте проект, загрузите в микроконтроллер при
                            помощи средыразработки и запустите. Убедитесь, что программа работает.
                        </li>
                        <li className='description-list'>
                            Найдите определение новых типов данных, имен, констант и структур:<br/>
                            uint32_t, GPIOH, MODER, GPIO_ODR_ODR_7, GPIO_ODR_ODR_6, GPIO_ODR_ODR_4, delay_ms,
                            LED_D1_SET, LED_D2_SET, LED_D3_SET;<br/>
                            Запишите для каждого имени: имя файла, где описана константа, ее тип, разрядность и
                            значение.
                        </li>
                        <li className='description-list'>
                            Измените код программы так, чтобы режим мигания светодиодов соответствовал выданному
                            варианту, приведенному в таблице 1.
                        </li>
                        <li className='description-list'>
                            Скомпилируйте измененный проект и загрузите его в микроконтроллер при помощи среды IAR
                            WORKBENCH.
                        </li>
                        <li className='description-list'>
                            Убедитесь, что полученный результат соответствует заданию.
                        </li>
                        <li className='description-list'>
                            Покажите преподавателю стенд с работающей программой.
                        </li>
                        <li className='description-list'>
                            Сохраните исходный код программы для составления отчета.
                        </li>
                        <li className='description-list'>
                            Подготовьте и защитите отчет.
                        </li>
                    </ol>
                    <label>
                        <b>Таблица 1&nbsp;&mdash;&nbsp;Варианты заданий</b>
                        <table className='description__table'>
                            <thead>
                                <tr>
                                    <th className='description__table-element wp-100'>
                                        <b>Вариант</b>
                                    </th>
                                    <th className='description__table-element'>
                                        <b>Режим работ светодиодов</b>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className='description__table-element center-aligned'>1</td>
                                <td className='description__table-element pl-5'>
                                    D1 мигает, D2 и D3 потушены
                                </td>
                            </tr>
                            <tr>
                                <td className='description__table-element center-aligned'>2</td>
                                <td className='description__table-element pl-5'>
                                    D1 и D2 мигают синхронно, D2 потушен
                                </td>
                            </tr>
                            <tr>
                                <td className='description__table-element center-aligned'>3</td>
                                <td className='description__table-element pl-5'>
                                    D1, D2 и D3 мигают синхронно
                                </td>
                            </tr>
                            <tr>
                                <td className='description__table-element center-aligned'>4</td>
                                <td className='description__table-element pl-5'>
                                    D1 горит, D2 и D3 мигают синхронно
                                </td>
                            </tr>
                            <tr>
                                <td className='description__table-element center-aligned'>5</td>
                                <td className='description__table-element pl-5'>
                                    D1 и D2 горят постоянно, D3 мигает
                                </td>
                            </tr>
                            <tr>
                                <td className='description__table-element center-aligned'>6</td>
                                <td className='description__table-element pl-5'>
                                    D1, D2 и D3 горят постоянно
                                </td>
                            </tr>
                            <tr>
                                <td className='description__table-element center-aligned'>7</td>
                                <td className='description__table-element pl-5'>
                                    D1 потушен, D2 и D3 мигают асинхронно
                                </td>
                            </tr>
                            <tr>
                                <td className='description__table-element center-aligned'>8</td>
                                <td className='description__table-element pl-5'>
                                    D3 горит постоянно, D1 мигает, D2 потушен
                                </td>
                            </tr>
                            <tr>
                                <td className='description__table-element center-aligned'>9</td>
                                <td className='description__table-element pl-5'>
                                    D1 мигает, D2 и D3 горят постоянно
                                </td>
                            </tr>
                            <tr>
                                <td className='description__table-element center-aligned'>10</td>
                                <td className='description__table-element pl-5'>
                                    D1 и D2 мигают асинхронно, D3 потушен
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </label>
                    <label>
                        <b>Контрольные вопросы:</b>
                    </label>
                    <ol>
                        <li className='description-list'>
                            Что такое микроконтроллер?
                        </li>
                        <li className='description-list'>
                            Каково назначение директивы препроцессора #include?
                        </li>
                        <li className='description-list'>
                            Откуда компилятор знает архитектуру (набор функциональных модулей, адреса и состав всех
                            регистров функциональных модулей) для которой создается проект?
                        </li>
                        <li className='description-list'>
                            В чем заключаются особенности и назначение функции main()?
                        </li>
                        <li className='description-list'>
                            В чем состоит назначение модуля дискретного ввода/вывода GPIO?
                        </li>
                        <li className='description-list'>
                            Сколько разрядов на каждом порту GPIO у микроконтроллера STM32F746?
                        </li>
                        <li className='description-list'>
                            Перечислите основные регистры дискретного модуля ввода/вывода.
                        </li>
                        <li className='description-list'>
                            Сколько светодиодов имеется в УЛС?
                        </li>
                        <li className='description-list'>
                            С помощью каких аппаратных средств происходит передача файла прошивки в микроконтроллер?
                        </li>
                        <li className='description-list'>
                            Каковы основные свойства типа void?
                        </li>
                        <li className='description-list'>
                            Что такое указатель?
                        </li>
                        <li className='description-list'>
                            Почему GPIOH->ODR |= LED_D1_SET зажигает светодиод?
                        </li>
                        <li className='description-list'>
                            Почему GPIOH->ODR ^= LED_D1_SET инвертирует свечение LED?
                        </li>
                        <li className='description-list'>
                            Почему равнозначны строки: <br/>
                            #define LED_D1_SET GPIO_ODR_7 <br/>
                            #define LED_D1_SET 0x80 <br/>
                            #define LED_D1_SET 128?
                        </li>
                    </ol>
                </div>
            </div>
        );
    }
}