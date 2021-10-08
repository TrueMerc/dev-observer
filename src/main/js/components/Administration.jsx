import React, {useEffect, useState} from "react";
import {Tab, Tabs} from "react-bootstrap";

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

    const [pageNumber, setPageNumber] = useState(0);
    const [usersPerPage, setUsersPerPage] = useState(20);
    const [users, setUsers] = useState([]);
    const [overallUsersCount, setOverallUsersCount] = useState(0);

    const url = `${props.serverUrl}users/forPage/${pageNumber}/${usersPerPage}`;
    console.log('URL: ' + url);

    useEffect(() => {
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
            console.log(json);
            setOverallUsersCount(json.overallUsersCount);
            setUsers(json.users);
        }).catch(error => {
            console.error(error);
        });
    }, []);


    return (
        <div className='tab-content'>
            <h2>Управление пользователями</h2>
            <h3>Всего пользователей: {overallUsersCount}</h3>
        </div>
    );
}