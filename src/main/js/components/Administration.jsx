import React, {useEffect, useState} from "react";
import {Button, Col, Form, Pagination, Row, Tab, Table, Tabs} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import "./Administration.css"
import {Strings} from "../domain/Strings";
import {Role} from "../domain/Role";



export const Administration = (props) => {

    return  (
        <div className='main-area'>
            <Tabs defaultActiveKey='userManagement'>
                <Tab
                    eventKey='userManagement'
                    title='Управление пользователями'
                >
                    <UserManagement serverUrl = {props.serverUrl}/>
                </Tab>
                <Tab
                    eventKey='deviceManagement'
                    title='Управление устройствами'
                >
                    <div className='tab-content'>
                        <h2>Управление устройствами</h2>
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
}

const UserManagement = (props) => {
    const Modes = Object.freeze({ UserTable: 0, UserRegistration: 1});

    const [mode, switchToMode] = useState(Modes.UserTable);

    const handleUserAdditionButtonClick = () => {
        switchToMode(Modes.UserRegistration);
    }

    const handleUserAdditionFinish = () => {
        switchToMode(Modes.UserTable);
    }

    return (
        <div className='tab-content'>
            {mode === Modes.UserTable &&
            <UserTable onUserAdditionButtonClick={handleUserAdditionButtonClick}/>
            }
            {mode === Modes.UserRegistration &&
            <UserRegistrationForm onFinish={handleUserAdditionFinish}/>
            }
        </div>
    );
}

const UserTable = ({onUserAdditionButtonClick}) => {
    // const userPerPagePossibleValues = [20, 50];
    const userPerPagePossibleValues = [2, 5];

    const [pageNumber, setPageNumber] = useState(0);
    const [usersPerPage, setUsersPerPage] = useState(userPerPagePossibleValues[0]);
    const [users, setUsers] = useState([]);
    const [overallUsersCount, setOverallUsersCount] = useState(0);

    const getPageUsers = (pageNumber, usersPerPage) => {
        const url = `${window.location.origin}/users/forPage/${pageNumber}/${usersPerPage}`;
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
                throw new Error("Server have responded with status " + response.status);
            }
        }).then(json => {
            setOverallUsersCount(json.overallUsersCount);
            setUsers([...json.users]);
        }).catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
        getPageUsers(pageNumber, usersPerPage);
    }, []);

    useEffect(() => {
        getPageUsers(pageNumber, usersPerPage);
    }, [pageNumber, usersPerPage]);

    useEffect(() => {
        setPageNumber(0);
    }, [usersPerPage]);

    const pagesCount = Math.floor(overallUsersCount / usersPerPage) + 1;

    return (
        <>
            <div className='user-management__control-panel'>
                <UserCount
                    pageNumber={pageNumber}
                    usersPerPage={usersPerPage}
                    usersOnPageCount={users.length}
                    overallUsersCount={overallUsersCount}
                />
                <Pagination className='ml-30 mb-0'>
                    {userPerPagePossibleValues.map(value =>
                        <Pagination.Item
                            key={`pagesCountSelectionItem${value}`}
                            active={usersPerPage === value}
                            onClick={() => {setUsersPerPage(value)}}
                        >
                            {value}
                        </Pagination.Item>
                    )}
                </Pagination>
                {pagesCount > 1 &&
                <PagesPagination
                    className='ml-30 mb-0'
                    pageNumber={pageNumber}
                    pagesCount={pagesCount}
                    onPageNumberChange={setPageNumber}
                    displayedPagesCount={7}
                />
                }
                <button className='btn btn-success ml-30' onClick={onUserAdditionButtonClick}>
                    <FontAwesomeIcon icon={faPlus}/>
                    &nbsp;
                    Добавить пользователя
                </button>
            </div>
            <Table
                className='user-management__user-table'
                striped={true} bordered={true} hover={true}
            >
                <thead className='user-management__user-table-header'>
                <tr>
                    <th>Номер</th>
                    <th>Фамилия, имя, отчество</th>
                    <th>Пользователь</th>
                    <th>E-mail</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) =>
                    <tr key={`userTableRow${index}`}>
                        <td>{pageNumber * usersPerPage + index + 1}</td>
                        <td>
                            {user.lastName
                            + (Strings.isNonEmptyString(user.firstName) ? ` ${user.firstName}` : '')
                            + (Strings.isNonEmptyString(user.patronymic) ? ` ${user.patronymic}` : '')
                            }
                        </td>
                        <td>
                            {user.login}
                        </td>
                        <td>
                            {user.email}
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
        </>
    );
}

UserTable.propTypes = {
    onUserAdditionButtonClick: PropTypes.func.isRequired
}

const UserCount = ({pageNumber, usersPerPage, usersOnPageCount, overallUsersCount}) => {
    const firstUserNumber = pageNumber * usersPerPage + 1;
    const lastUserNumber = firstUserNumber + usersOnPageCount - 1;

    const nbsp = '\u00a0';
    const mdash = '\u2014';

    const numbers = usersOnPageCount > 1
        ? `${firstUserNumber}${nbsp}${mdash}${nbsp}${lastUserNumber}`
        : `${firstUserNumber}`;

    return (
        <div className='user-management__user-count'>
            <span>
                Пользователи:&nbsp;{numbers}&nbsp;({overallUsersCount})
            </span>
        </div>
    );
}

const PagesPagination = ({pageNumber, pagesCount, onPageNumberChange, displayedPagesCount, className}) => {

    const center = Math.floor(displayedPagesCount / 2);
    const pageInHead = pageNumber <= center;
    const pageInTail = (pagesCount - 1 - pageNumber) <= center;

    let pageNumbers;
    if(pagesCount <= displayedPagesCount) {
        pageNumbers = [...Array(pagesCount).keys()];
    } else if (pageInHead) {
        pageNumbers = [...Array(displayedPagesCount - 1).keys(), pagesCount - 1];
    } else if (pageInTail) {
        const tail = [...Array(displayedPagesCount - 1).keys()]
            .map((value, index) => pagesCount - displayedPagesCount + index + 1);
        pageNumbers = [0, ...tail];
    } else {
        const centralPart = [...Array(displayedPagesCount - 2).keys()]
            .map((value, index) => (index + pageNumber - center + 1));
        pageNumbers = [0, ...centralPart, pagesCount - 1];
    }

    return (
        <Pagination className={className}>
            <Pagination.Prev
                disabled={pageNumber === 0}
                onClick={() => onPageNumberChange(--pageNumber)}
            />
            {pageNumbers.map(number =>
                <Pagination.Item
                    key={`pageKey${number}`}
                    active={number === pageNumber}
                    onClick={() => onPageNumberChange(number)}
                >
                    {number + 1}
                </Pagination.Item>
            )}
            <Pagination.Next
                disabled={pageNumber === pagesCount - 1}
                onClick={() => onPageNumberChange(++pageNumber)}
            />
        </Pagination>
    );
}

PagesPagination.propTypes = {
    className: PropTypes.string,
    pageNumber: PropTypes.number.isRequired,
    pagesCount: PropTypes.number.isRequired,
    onPageNumberChange: PropTypes.func.isRequired,
    displayedPagesCount: PropTypes.number,
}

PagesPagination.defaultProps = {
    displayedPagesCount: 7
}

const UserRegistrationForm = ({onFinish}) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(`${Role.UNDEFINED}`);

    const handleSubmit = () => {
        const user = {
            login: login,
            password: password,
            lastName: lastName,
            firstName: firstName,
            patronymic: patronymic,
            email: email,
            roleId: Number.parseInt(role)
        }
        console.log(user);
        const url = `${window.location.origin}/users/addUser`
        fetch(url, {
            method: 'POST',
            mode: 'same-origin',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => {
            if(response.ok) {
                console.log('User was registered successfully');
                onFinish();
            } else {
                throw new Error('User registration error. Server responded with status ' + response.status)
            }
        }).catch(error => {
            console.error(error);
            onFinish();
        });
    }

    const handleCancel = () => {
        onFinish();
    }

    return (
        <div className='half-screen'>
            <Form onSubmit={handleSubmit} onReset={handleCancel}>
                <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='userRegistration.Login'
                >
                    <Form.Label
                        column={true}
                        lg={2}
                    >
                        Пользователь
                    </Form.Label>
                    <Col lg={10}>
                        <Form.Control
                            onChange={event => setLogin(event.target.value)}
                            placeholder='Имя пользователя'
                            value={login}
                        />
                    </Col>
                </Form.Group>
                <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='userRegistration.Password'
                >
                    <Form.Label column={true} lg={2}>Пароль</Form.Label>
                    <Col lg={10}>
                        <Form.Control
                            onChange={event => setPassword(event.target.value)}
                            placeholder='Пароль'
                            type='password'
                            value={password}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-3' controlId='userRegistration.PasswordConfirmation'>
                    <Form.Label
                        column={true}
                        lg={2}
                    >
                        Подтверждение пароля
                    </Form.Label>
                    <Col lg={10}>
                        <Form.Control
                            onChange={event => setPasswordConfirmation(event.target.value)}
                            placeholder='Пароль'
                            type='password'
                            value={passwordConfirmation}
                        />
                    </Col>
                </Form.Group>
                <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='userRegistration.LastName'
                >
                    <Form.Label
                        column={true}
                        lg={2}
                    >
                        Фамилия
                    </Form.Label>
                    <Col lg={10}>
                        <Form.Control
                            onChange={event => setLastName(event.target.value)}
                            placeholder='Фамилия'
                            value={lastName}
                        />
                    </Col>
                </Form.Group>
                <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='userRegistration.FirstName'
                >
                    <Form.Label
                        column={true}
                        lg={2}
                    >
                        Имя
                    </Form.Label>
                    <Col lg={10}>
                        <Form.Control
                            onChange={event => setFirstName(event.target.value)}
                            placeholder='Имя'
                            value={firstName}
                        />
                    </Col>
                </Form.Group>
                <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='userRegistration.Patronymic'
                >
                    <Form.Label
                        column={true}
                        lg={2}
                    >
                        Отчество
                    </Form.Label>
                    <Col lg={10}>
                        <Form.Control
                            onChange={event => setPatronymic(event.target.value)}
                            placeholder='Отчество'
                            value={patronymic}
                        />
                    </Col>
                </Form.Group>
                <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='userRegistration.E-mail'
                >
                    <Form.Label
                        column={true}
                        lg={2}
                    >
                        E-Mail
                    </Form.Label>
                    <Col lg={10}>
                        <Form.Control
                            onChange={event => setEmail(event.target.value)}
                            placeholder='E-Mail'
                            type='email'
                            value={email}
                        />
                    </Col>
                </Form.Group>
                <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='userRegistration.Role'
                >
                    <Form.Label
                        column={true}
                        lg={2}
                    >
                        Тип пользователя
                    </Form.Label>
                    <Col lg={10}>
                        <Form.Control
                            as='select'
                            value={role}
                            onChange={event => setRole(event.target.value)}
                            defaultValue='Тип пользователя'
                        >
                            <option selected hidden>Тип пользователя</option>
                            <option value={`${Role.ADMINISTRATOR}`}>Администратор</option>
                            <option value={`${Role.STAFF}`}>Сотрудник</option>
                            <option value={`${Role.USER}`}>Пользователь</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <div className='user-management__registration-form-buttons'>
                    <Button variant='outline-success' type='submit'>
                        Сохранить
                    </Button>
                    <Button className='ml-20' variant='outline-danger' type='reset'>
                        Отмена
                    </Button>
                </div>
            </Form>
        </div>
    );
}