import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Col, Container, Form, FormGroup, Row} from "react-bootstrap";
import "./DeviceManagement.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowAltCircleRight} from "@fortawesome/free-solid-svg-icons";
import {Parity} from "../domain/Parity";
import {StopBits} from "../domain/StopBits";


export const DeviceManagement = (
    {devices, deviceModes, onDeviceModeChange, deviceControllerUrl, hardwareControllerUrl}
) => {
    const getDeviceMode = (device) => {
        return (device !== undefined && device !== null)
            ? deviceModes.find(mode => mode.id === device.modeId)
            : null;
    }

    const [currentDevice, setCurrentDevice] = useState(devices ? devices[0] : null);
    const [currentDeviceMode, setCurrentDeviceMode] = useState(getDeviceMode(currentDevice));
    const [availableSerialPorts, setAvailableSerialPorts] = useState([]);

    useEffect(() => {
        const { pathname, origin } = hardwareControllerUrl;
        const url = new URL(`${pathname}/getAvailableSerialPortNames`, origin);
        fetch(`${url}`, {
            method: 'GET',
            mode: 'same-origin',
            credentials: 'same-origin'
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(
                    `Can't get available serial ports. Server has responded with status ${response.status}`
                );
            }
        }).then(json => {
            setAvailableSerialPorts(json);
        }).catch(error => {
            console.error(error);
        })
    }, []);



    const handleCurrentDeviceChange = (event) => {
        const newId = Number.parseInt(event.target.value);
        if (currentDevice.id !== id) {
            setCurrentDevice(devices.find(device => device.id === newId));
        }
    }

    const handleCurrentDeviceModeChange = (event) => {
        const newId = Number.parseInt(event.target.value);
        if (currentDeviceMode.id !== newId) {
            setCurrentDeviceMode(deviceModes.find(mode => mode.id === newId));
            onDeviceModeChange(currentDevice.id, newId);
        }
    }

    return (
        <div className='tab-content'>
            <div className='half-screen-on-xl-screens full-screen-on-typical-screens'>
                <Container fluid={true}>
                    <Row>
                        <Col lg={2}>
                            <Form.Label column={true}>
                                Выбранное устройство
                            </Form.Label>
                        </Col>
                        <Col>
                            <Form.Control
                                autoFocus
                                as='select'
                                value={currentDevice.id}
                                onChange={handleCurrentDeviceChange}
                            >
                                {devices.map((device) =>
                                    <option key={`deviceOption${device.id}`} value={`${device.id}`}>
                                        {device.name}
                                    </option>
                                )}
                            </Form.Control>
                        </Col>
                        <Col lg={2}>
                            <Form.Label column={true}>
                                Режим управления
                            </Form.Label>
                        </Col>
                        <Col>
                            <Form.Control
                                as='select'
                                value={`${currentDeviceMode.id}`}
                                onChange={handleCurrentDeviceModeChange}
                            >
                                {deviceModes.map(mode =>
                                    <option key={`deviceModeOption${mode.id}`} value={`${mode.id}`}>
                                        {mode.name}
                                    </option>
                                )}
                            </Form.Control>
                        </Col>
                    </Row>
                    {currentDeviceMode.manualControlEnabled &&
                        <Row className='mt-15'>
                            <Col lg={true}>
                                <CommandSendingForm
                                    deviceId={currentDevice.id}
                                    deviceControllerUrl={deviceControllerUrl}
                                />
                            </Col>
                            <Col lg={true}>
                                <UartParametersForm
                                    deviceId={currentDevice.id}
                                    deviceControllerUrl={deviceControllerUrl}
                                    settings={currentDevice.settings}
                                    availableSerialPorts={availableSerialPorts}
                                />
                            </Col>
                        </Row>
                    }
                </Container>
            </div>
        </div>
    );
};

DeviceManagement.propTypes = {
    devices: PropTypes.array.isRequired,
    deviceModes: PropTypes.array.isRequired,
    onDeviceModeChange: PropTypes.func.isRequired,
    deviceControllerUrl: PropTypes.object.isRequired,
    hardwareControllerUrl: PropTypes.object.isRequired
};

const CommandSendingForm = ({deviceId, deviceControllerUrl}) => {

    const [commandText, setCommandText] = useState('');

    const handleCommandTextChange = (event) => {
        const newText = event.target.value;
        setCommandText(newText);
    }

    const handleSendButtonClick = () => {
        const { pathname, origin } = deviceControllerUrl;
        const url = new URL(`${pathname}/sendCommandToDevice/${deviceId}`, origin);

        fetch(`${url}`, {
            method: 'POST',
            mode: 'same-origin',
            credentials: 'same-origin',
            headers: {
                'content-type': 'application/json'
            },
            body: `${commandText}`
        }).then(response => {
            if (response.ok) {
                setCommandText('');
            } else {
                console.error(`Command sending failed! Server has responded with status: ${response.statusText}`);
            }
        }).catch(error => console.error(error));
    }

    return (
        <div className="command-panel">
            <Form.Control as="textarea"
                          rows={6}
                          value={commandText}
                          onChange={handleCommandTextChange}
            />
            <button
                className="btn btn-outline-success download-button"
                onClick={handleSendButtonClick}
            >
                <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                &nbsp;
                Отправить
            </button>
        </div>
    );
}

CommandSendingForm.propTypes = {
    deviceId: PropTypes.number.isRequired,
    deviceControllerUrl: PropTypes.object.isRequired,
}

const UartParametersForm = ({deviceId, deviceControllerUrl, availableSerialPorts}) => {

    const [parameters, setParameters] = useState({
        port: (availableSerialPorts.length > 0) ? availableSerialPorts[0] : '',
        baudRate: 9600,
        parity: Parity.NONE.value,
        dataBits: 8,
        stopBits: StopBits.ONE.value
    });

    const [isInitialized, setInitialized] = useState(false);

    const formUrlForMethod = (deviceControllerUrl, methodName, deviceId) => {
        const { pathname, origin } = deviceControllerUrl;
        return new URL(`${pathname}/${methodName}/${deviceId}`, origin);
    }

    useEffect(() => {
        const url = formUrlForMethod(deviceControllerUrl, 'getDeviceSettings', deviceId);
        fetch(`${url}`, {
            method: 'GET',
            mode: 'same-origin',
            credentials: 'same-origin'
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.error("Can't fetch device settings");
            }
        }).then(json => {
            const newSettings = {
                baudRate: json.baudRate,
                parity: json.parity,
                dataBits: json.dataBits,
                stopBits: json.stopBits
            };
            setParameters(newSettings);
            setInitialized(true);
        }).catch(error => {
            console.error(error);
        })
    }, []);

    useEffect(() => {
        if(!isInitialized) {
            return;
        }
        const url = formUrlForMethod(deviceControllerUrl, 'changeDeviceSettings', deviceId);
        fetch(`${url}`, {
            method: 'POST',
            mode: 'same-origin',
            credentials: 'same-origin',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(parameters)
        }).then(response => {
            if (response.ok) {
                const newSettings = {
                    port: json.port,
                    baudRate: json.baudRate,
                    parity: json.parity,
                    dataBits: json.dataBits,
                    stopBits: json.stopBits
                };
                setParameters(newSettings);
            } else {
                console.error(`Parameters sending failed! Server has responded with status: ${response.statusText}`);
            }
        }).catch(error => console.error(error));
    }, [parameters.port, parameters.baudRate, parameters.parity, parameters.dataBits, parameters.stopBits]);

    const handleNumberFieldChange = (event) => {
        const { name, value } = event.target;
        setParameters(prevState => ({...prevState, [name]: value}));
    }

    const handleParityChange = (event) => {
        const value = event.target.value;
        const newParityValue = Number.parseInt(value);
        setParameters(prevState => ({...prevState, parity: newParityValue}));
    }

    const handleStopBitsChange = (event) => {
        const value = event.target.value;
        const newStopBitsValue = Number.parseInt(value);
        setParameters(prevState => ({...prevState, stopBits: newStopBitsValue}));
    }

    const handleSerialPortChange = (event) => {
        const value = event.target.value;
        setParameters( prevState => ({...prevState, port: value}));
    }

    return (
      <Form>
          <FormGroup as={Row} className='mb-3'>
              <Form.Label column>Порт</Form.Label>
              <Col>
                  <Form.Control
                      as='select'
                      name='serialPort'
                      value={`${parameters.port}`}
                      onChange={handleSerialPortChange}
                  >
                      {availableSerialPorts.map(port =>
                          <option key={`serialPortOption${port}`} value={`${port}`}>
                              {port}
                          </option>
                      )}
                  </Form.Control>
              </Col>
          </FormGroup>
          <FormGroup as={Row} className='mb-3'>
              <Form.Label column>Скорость передачи данных</Form.Label>
              <Col>
                  <Form.Control
                      name='baudRate'
                      type='number'
                      value={parameters.baudRate}
                      onChange={handleNumberFieldChange}
                      min={1}
                  />
              </Col>
          </FormGroup>
          <FormGroup as={Row} className='mb-3'>
              <Form.Label column>Проверка чётности</Form.Label>
              <Col>
                  <Form.Control
                      as='select'
                      name='parity'
                      value={`${parameters.parity}`}
                      onChange={handleParityChange}
                  >
                      {Parity.values().map(parity =>
                          <option key={`parityOption${parity.name}`} value={`${parity.value}`}>
                              {parity.name}
                          </option>
                      )}
                  </Form.Control>
              </Col>
          </FormGroup>
          <FormGroup as={Row} className='mb-3'>
              <Form.Label column>Биты данных</Form.Label>
              <Col>
                  <Form.Control
                      name='dataBits'
                      type='number'
                      value={parameters.dataBits}
                      onChange={handleNumberFieldChange}
                      min={1}
                  />
              </Col>
          </FormGroup>
          <FormGroup as={Row} className='mb-3'>
              <Form.Label column>Стоп-биты</Form.Label>
              <Col>
                  <Form.Control
                      as='select'
                      name='stopBits'
                      value={`${parameters.stopBits}`}
                      onChange={handleStopBitsChange}
                  >
                      {StopBits.values().map(stopBits =>
                          <option key={`stopBitsOption${stopBits.name}`} value={`${stopBits.value}`}>
                              {stopBits.name}
                          </option>
                      )}
                  </Form.Control>
              </Col>
          </FormGroup>
      </Form>
    );
}

UartParametersForm.propTypes = {
    deviceId: PropTypes.number.isRequired,
    deviceControllerUrl: PropTypes.object.isRequired,
    availableSerialPorts: PropTypes.array.isRequired
}