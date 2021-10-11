import React, {useEffect, useState} from "react";
import {Pagination, Tab, Tabs} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import "./Administration.css"


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
    const userPerPagePossibleValues = [20, 50];

    const [pageNumber, setPageNumber] = useState(0);
    const [usersPerPage, setUsersPerPage] = useState(userPerPagePossibleValues[0]);
    const [users, setUsers] = useState([]);
    const [overallUsersCount, setOverallUsersCount] = useState(0);

    const url = `${window.location.origin}/users/forPage/${pageNumber}/${usersPerPage}`;
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

    const pagesCount = Math.floor(overallUsersCount / usersPerPage) + 1;

    return (
        <div className='tab-content'>
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
                <button className='btn btn-success ml-30'>
                    <FontAwesomeIcon icon={faPlus}/>
                    &nbsp;
                    Добавить пользователя
                </button>
            </div>
        </div>
    );
}

export const UserCount = ({pageNumber, usersPerPage, usersOnPageCount, overallUsersCount}) => {
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

export const PagesPagination = ({pageNumber, pagesCount, onPageNumberChange, displayedPagesCount, className}) => {

    const center = Math.floor(displayedPagesCount / 2);
    console.log(center);
    const pageInHead = pageNumber <= center;
    const pageInTail = (pagesCount - 1 - pageNumber) <= center;

    let pageNumbers = [];
    if(pagesCount <= displayedPagesCount) {
        pageNumbers = [...Array(pagesCount).keys()];
    } else if (pageInHead) {
        pageNumbers = [...Array(displayedPagesCount - 1).keys(), pagesCount - 1];
    } else if (pageInTail) {
        const tail = Array(displayedPagesCount - 1)
            .map((value, index) => pagesCount - displayedPagesCount + index);
        pageNumbers = [0, ...tail];
    } else {
        const centralPart = Array(displayedPagesCount).map((value, index) => index + pageNumber - center);
        pageNumbers = [0, ...centralPart, pagesCount - 1];
    }

    return (
        <Pagination className={className}>
            {pagesCount > displayedPagesCount &&
            <Pagination.Prev
                disabled={pageNumber === 0}
                onClick={onPageNumberChange(--pageNumber)}
            />
            }
            {pageNumbers.map(value =>
                <Pagination.Item key={`pageKey${value}`} active={value === pageNumber}>
                    {value + 1}
                </Pagination.Item>
            )}
            {pagesCount > displayedPagesCount &&
            <Pagination.Next
                disabled={pageNumber === pagesCount - 1}
                onClick={onPageNumberChange(++pageNumber)}
            />
            }
        </Pagination>
    );
}

PagesPagination.propTypes = {
    pageNumber: PropTypes.number.isRequired
}

PagesPagination.defaultProps = {
    displayedPagesCount: 7
}