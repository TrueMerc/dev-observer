import React, {useEffect, useState} from "react";
import "./FirmwareQueue.css"

export const FirmwareQueue = ({firmwareControllerUrl}) => {
    const updatePeriodInMs = 1000;

    const [currentFirmwareName, setCurrentFirmwareName] = useState('-');
    const [firmwareQueueLength, setFirmwareQueueLength] = useState(0);
    const [userNumberInQueue, setUserNumberInQueue] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            console.log("Firmware queue data updated")
        }, updatePeriodInMs);
        return () => clearInterval(id);
    }, []);

    return (
        <div className='firmware-queue'>
            <span>Выполняется прошивка: {currentFirmwareName}</span>
            <span>Прошивок в очереди: {firmwareQueueLength}</span>
            <span>Номер в очереди: {userNumberInQueue}</span>
        </div>
    );
}