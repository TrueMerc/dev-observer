import React, {useEffect, useState} from "react";
import "./FirmwareQueue.css"
import {observer} from "mobx-react";
import {Strings} from "../domain/Strings";

export const FirmwareQueue = observer(({firmwareControllerUrl}) => {
    const updatePeriodInMs = 1000;

    const [activeFirmwareName, setActiveFirmwareName] = useState('\u2014');
    const [length, setLength] = useState(0);
    const [itemsBefore, setItemsBefore] = useState(0);
    const [isUnprocessedFirmwareOwner, setAsUnprocessedFirmwareOwner] = useState(false);

    useEffect(() => {
        updateState();
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            updateState();
        }, updatePeriodInMs);
        return () => clearInterval(id);
    }, []);

    const updateState = () => {
        const url = `${firmwareControllerUrl}/queueState`;
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
                throw new Error('Server has responded with status ' + response.status);
            }
        }).then(json => {
            const name = Strings.isNonEmptyString(json.activeFirmwareName) ? json.activeFirmwareName : '\u2014';
            setActiveFirmwareName(name);
            setLength(json.size);
            setItemsBefore(json.itemsBefore);
            setAsUnprocessedFirmwareOwner(json.hasUnprocessedFirmware);
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div className='firmware-queue'>
            <span>Выполняется прошивка: {activeFirmwareName}</span>
            <span>Прошивок в очереди: {length}</span>
            <span>Номер в очереди: {isUnprocessedFirmwareOwner ? (itemsBefore + 1) : '\u2014'}</span>
        </div>
    );
});