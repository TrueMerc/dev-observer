import React, {useState} from "react";
import PropTypes from "prop-types";
import {Col, Container, Form, FormGroup, Row} from "react-bootstrap";
import "./DeviceManagement.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowAltCircleRight} from "@fortawesome/free-solid-svg-icons";


export const DeviceManagement = ({devices, deviceModes, onDeviceModeChange}) => {
    const getDeviceMode = (device) => {
        return (device !== undefined && device !== null)
            ? deviceModes.find(mode => mode.id === device.modeId)
            : null;
    }

    const [currentDevice, setCurrentDevice] = useState(devices ? devices[0] : null);
    const [currentDeviceMode, setCurrentDeviceMode] = useState(getDeviceMode(currentDevice));

    const handleCurrentDeviceChange = (event) => {
        const newId = Number.parseInt(event.target.value);
        if (currentDevice.id !== id) {
            console.log(event.target.value);
            console.log('Another device has been selected');
            setCurrentDevice(devices.find(device => device.id === newId));
        }
    }

    const handleCurrentDeviceModeChange = (event) => {
        const newId = Number.parseInt(event.target.value);
        if (currentDeviceMode.id !== newId) {
            setCurrentDeviceMode(deviceModes.find(mode => mode.id === newId));
            console.log('Device mode has been changed.');
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
                                {deviceModes.map((mode) =>
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
                                <CommandSendingForm/>
                            </Col>
                            <Col lg={true}>
                                <UartParametersForm/>
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
    deviceModes: PropTypes.array.isRequired
};

const CommandSendingForm = ({onSend}) => {
    return (
        <div className="command-panel">
            <Form.Control as="textarea" rows={5}/>
            <button
                className="btn btn-outline-success download-button"
                onClick={onSend}
            >
                <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                &nbsp;
                Отправить
            </button>
        </div>
    );
}

const UartParametersForm = ({onChange}) => {
    return (
      <Form>
          <FormGroup as={Row} className='mb-3'>
              <Form.Label column>Скорость передачи данных</Form.Label>
              <Col>
                  <Form.Control value='number'/>
              </Col>
          </FormGroup>
          <FormGroup as={Row} className='mb-3'>
              <Form.Label column>Проверка чётности</Form.Label>
              <Col>
                  <Form.Control as='select'></Form.Control>
              </Col>
          </FormGroup>
          <FormGroup as={Row} className='mb-3'>
              <Form.Label column>Биты данных</Form.Label>
              <Col>
                  <Form.Control value='number'/>
              </Col>
          </FormGroup>
          <FormGroup as={Row} className='mb-3'>
              <Form.Label column>Стоп-биты</Form.Label>
              <Col>
                  <Form.Control value='number'/>
              </Col>
          </FormGroup>
      </Form>
    );
}