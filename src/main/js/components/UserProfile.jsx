import React from "react";
import PropTypes from "prop-types";
import {observer} from "mobx-react";
import "./UserProfile.css";

export const UserProfile = observer((props) => {

    console.log(props.user);
    const { login, firstName, lastName, patronymic, email, isAdministrator } = props.applicationStore.user || {};

    return (
        <div className='m-10'>
            <h1>Профиль пользователя</h1>
            <UserProfileField id='login' name='Пользователь' value={login}/>
            <UserProfileField id='lastName' name='Фамилия' value={lastName}/>
            <UserProfileField id='firstName' name='Имя' value={firstName}/>
            <UserProfileField id='patronymic' name='Отчество' value={patronymic}/>
            <UserProfileField id='email' name='E-Mail' value={email}/>
            <UserProfileField id='role' name='Роль' value={isAdministrator ? 'Администратор' : 'Пользователь'}/>
        </div>
    );
});

UserProfile.propTypes = {
    applicationStore: PropTypes.object.isRequired
}

const UserProfileField = ({id, name, value}) => {
    const labelText = `${name}:`;

    return (
        <div className='user-profile__field'>
            <label
                className='user-profile__label'
                htmlFor={id}
            >
                {labelText}
            </label>
            <span
                id='userName'
                className='ml-10'
            >
                {value}
            </span>
        </div>
    );
}