import React, {useEffect, useState} from "react";
import {Button, Col, Form, Pagination, Row, Tab, Table, Tabs} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faUserEdit, faUserTimes} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import "./Administration.css"
import {Strings} from "../domain/Strings";
import {observer} from "mobx-react";
import {Tooltip} from "react-tippy";
import FormContext from "react-bootstrap/FormContext";

export const Administration = observer(({applicationStore}) => {
    const {user: administrator, roles, isReady} = applicationStore;

    return  (
        <div className='main-area'>
            <Tabs defaultActiveKey='userManagement'>
                <Tab
                    eventKey='userManagement'
                    title='Управление пользователями'
                >
                    {isReady && administrator &&
                    <UserManagement
                        administrator={administrator}
                        roles={roles}
                    />
                    }
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
});

const UserManagement = ({roles, administrator}) => {

    const [editedUser, setEditedUser] = useState(null);

    const Modes = Object.freeze({ UserTable: 0, UserRegistration: 1});

    const [mode, switchToMode] = useState(Modes.UserTable);

    const handleUserAdditionButtonClick = () => {
        switchToMode(Modes.UserRegistration);
        setEditedUser(null)
    }

    const handleUserAdditionFinish = () => {
        switchToMode(Modes.UserTable);
    }

    const handleUserEdition = (user) => {
        switchToMode(Modes.UserRegistration)
        setEditedUser(user);
    }

    return (
        <div className='tab-content'>
            {mode === Modes.UserTable &&
            <UserTable
                onUserAdditionButtonClick={handleUserAdditionButtonClick}
                onUserEditing={handleUserEdition}
                roles={roles}
                administrator={administrator}
            />
            }
            {mode === Modes.UserRegistration &&
            <UserForm
                onFinish={handleUserAdditionFinish}
                roles={roles}
                user={editedUser}
            />
            }
        </div>
    );
}

const UserTable = ({onUserAdditionButtonClick, onUserEditing, roles, administrator}) => {
    // const userPerPagePossibleValues = [20, 50];
    const userPerPagePossibleValues = [2, 5];

    const [pageNumber, setPageNumber] = useState(0);
    const [usersPerPage, setUsersPerPage] = useState(userPerPagePossibleValues[0]);
    const [users, setUsers] = useState([]);
    const [overallUsersCount, setOverallUsersCount] = useState(0);

    useEffect(() => {
        getPageUsers(pageNumber, usersPerPage);
    }, []);

    useEffect(() => {
        getPageUsers(pageNumber, usersPerPage);
    }, [pageNumber, usersPerPage]);

    useEffect(() => {
        setPageNumber(0);
    }, [usersPerPage]);

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

    const deleteUser = (user) => {
        const url = `${window.location.origin}/users/deleteUser/${user.id}`;
        fetch(url, {
            method: 'DELETE',
            mode: 'same-origin',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(response.ok) {
                const newPageNumber = (users.length > 1) ? pageNumber : (pageNumber - 1);
                if(newPageNumber !== pageNumber) {
                    setPageNumber(newPageNumber);
                }
                getPageUsers(newPageNumber, usersPerPage);
            } else {
                throw new Error(`Server have responded with status ${response.status}`)
            }
        }).catch(error => {
            console.error(error);
        });
    }

    const pagesCount = Math.floor(overallUsersCount / usersPerPage) + overallUsersCount % usersPerPage;

    return (
        <>
            <div className='user-management__control-panel'>
                <UserCount
                    pageNumber={pageNumber}
                    usersPerPage={usersPerPage}
                    usersOnPageCount={users.length}
                    overallUsersCount={overallUsersCount}
                />
                <Tooltip title='Количество отображаемых пользователей'>
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
                </Tooltip>
                {pagesCount > 1 &&
                <PagesPagination
                    className='ml-30 mb-0'
                    pageNumber={pageNumber}
                    pagesCount={pagesCount}
                    onPageNumberChange={setPageNumber}
                    displayedPagesCount={7}
                />
                }
                <button
                    className='btn btn-outline-success ml-30'
                    onClick={onUserAdditionButtonClick}
                >
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
                    <th>Тип пользователя</th>
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
                            {(roles.find(role => role.id === user.roleId) || {}).name}
                        </td>
                        <td>
                            {user.email}
                        </td>
                        <td>
                            <div className='user-management__user-table-action-buttons'>
                                <Tooltip
                                    className='action-button'
                                    title='Редактировать'
                                >
                                    <button
                                        className='btn btn-outline-warning'
                                        onClick={() => onUserEditing(user)}
                                    >
                                        <FontAwesomeIcon icon={faUserEdit}/>
                                    </button>
                                </Tooltip>
                                {user.id !== administrator.id &&
                                <Tooltip
                                    className='action-button'
                                    title='Удалить'
                                >
                                    <button
                                        className='btn btn-outline-danger'
                                        onClick={() => deleteUser(user)}
                                    >
                                        <FontAwesomeIcon icon={faUserTimes}/>
                                    </button>
                                </Tooltip>
                                }
                            </div>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
        </>
    );
}

UserTable.propTypes = {
    onUserAdditionButtonClick: PropTypes.func.isRequired,
    onUserEditing: PropTypes.func.isRequired,
    roles: PropTypes.array.isRequired,
    administrator: PropTypes.object.isRequired
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

const UserForm = ({onFinish, roles, user}) => {

    const [login, setLogin] = useState(user ? user.login : '');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [lastName, setLastName] = useState(user ? user.lastName : '');
    const [firstName, setFirstName] = useState(user ? user.firstName : '');
    const [patronymic, setPatronymic] = useState(user ? user.patronymic : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [role, setRole] = useState(user ? `${user.roleId}` : '');
    const [errors, setErrors] = useState({});
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        setValidated(false);
        setErrors({});
    }, [login, password, passwordConfirmation, lastName, firstName, patronymic, email, role]);

    const findErrors = () => {
        const errors = {}
        errors.emptyLogin = Strings.isEmptyString(login);
        errors.emptyPassword = Strings.isEmptyString(password) && !user;
        errors.passwordMismatch = password.localeCompare(passwordConfirmation) !== 0;
        errors.emptyLastName = Strings.isEmptyString(lastName);
        errors.role = !(roles.map(role => role.id).find(id => id === Number.parseInt(role)));
        return errors;
    }

    const hasErrors = (errors) => {
        for(let field in errors) {
            if(errors[field]) {
                return true;
            }
        }
        return false;
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        const errors = findErrors();
        if (!form.checkValidity() || hasErrors(errors)) {
            event.preventDefault();
            event.stopPropagation();
            setErrors(errors);
            setValidated(true);
            return;
        }

        const newUser = {
            id: user ? user.id : 0,
            login: login,
            password: password,
            lastName: lastName,
            firstName: firstName,
            patronymic: patronymic,
            email: email,
            roleId: Number.parseInt(role)
        }

        const url = user
            ? `${window.location.origin}/users/updateUser`
            : `${window.location.origin}/users/addUser`;

        const method = user ? 'PUT' : 'POST';

        const onSuccess = () => {
            console.log("User was successfully " + user ? "updated" : "registered");
            onFinish();
        }

        const onError = (error) => {
            console.error((user ? "Registration" : "Update" ) + ` failed with error: ${error}`);
            onFinish();
        }

        sendUser(url, newUser, method, onSuccess, onError);
    }

    const sendUser = (url, user, method, onSuccess, onError) => {
        fetch(url, {
            method: method,
            mode: 'same-origin',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => {
            if(response.ok) {
                onSuccess();
            } else {
                throw new Error('Error. Server responded with status ' + response.status)
            }
        }).catch(error => {
            onError(error);
        });
    }

    const handleCancel = () => {
        onFinish();
    }

    return (
        <div className='half-screen'>
            <Form
                noValidate
                onSubmit={handleSubmit}
                onReset={handleCancel}
            >
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
                            autoFocus
                            onChange={event => setLogin(event.target.value)}
                            placeholder='Имя пользователя'
                            value={login}
                            isValid={validated && !errors.emptyLogin}
                            isInvalid={errors.emptyLogin}
                        />
                        <Form.Control.Feedback type='invalid'>
                            Пожалуйста, укажите имя пользователя
                        </Form.Control.Feedback>
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
                            placeholder={user ? 'Для изменения пароля введите новый пароль' : 'Пароль'}
                            type='password'
                            value={password}
                            isValid={validated && !errors.passwordMismatch && !errors.emptyPassword}
                            isInvalid={errors.passwordMismatch || errors.emptyPassword}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.passwordMismatch
                                ? 'Значания в полях \"Пароль\" и \"Подтверждение пароля\" не совпадают'
                                : 'Пожалуйста, введите пароль'
                            }
                        </Form.Control.Feedback>
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
                            placeholder='Подтверждение пароля'
                            type='password'
                            value={passwordConfirmation}
                            isValid={validated && !errors.passwordMismatch && !errors.emptyPassword}
                            isInvalid={errors.passwordMismatch || errors.emptyPassword}
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
                            isValid={validated && !errors.emptyLastName}
                            isInvalid={errors.emptyLastName}
                        />
                        <Form.Control.Feedback type='invalid'>
                            Пожалуйста, укажите фамилию
                        </Form.Control.Feedback>
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
                            isValid={validated}
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
                            isValid={validated}
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
                            isValid={validated}
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
                            isValid={validated && !errors.role}
                            isInvalid={errors.role}
                        >
                            <option value='' hidden>Тип пользователя</option>
                            {roles.map((userRole, index) =>
                                <option key={`roleOption${index}`} value={`${userRole.id}`}>
                                    {userRole.name}
                                </option>
                            )}
                        </Form.Control>
                        <Form.Control.Feedback type='invalid'>
                            Выберите тип пользователя
                        </Form.Control.Feedback>
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