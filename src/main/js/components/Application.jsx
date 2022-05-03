import React, {useEffect} from "react";
import LaboratoryPage from "./LaboratoryPage.jsx";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {Header} from "./Header.jsx";
import {LeftBar} from "./LeftBar.jsx";
import {DeviceDescription} from "./DeviceDescription.jsx";
import {ApplicationStore} from "../store/ApplicationStore";
import {UserProfile} from "./UserProfile.jsx";
import {Administration} from "./Administration.jsx";

const Application = () => {

    const applicationStore = new ApplicationStore(Object.assign(window.location.origin));

    useEffect(() => {
        applicationStore.load();
    }, []);

    return (
        <BrowserRouter>
            <div className='application'>
                <Header applicationStore = {applicationStore}/>
                <div className='main-section'>
                    <LeftBar applicationStore = {applicationStore}/>
                    <Switch>
                        <Route path="/" exact>
                            <Redirect to={'/labs/1'}/>
                        </Route>
                        <Route path="/labs/:laboratoryId">
                            <LaboratoryPage applicationStore = {applicationStore} />
                        </Route>
                        <Route path="/description">
                            <DeviceDescription/>
                        </Route>
                        <Route path="/profile">
                            <UserProfile applicationStore = {applicationStore}/>
                        </Route>
                        <Route path="/administration">
                            <Administration applicationStore = {applicationStore}/>
                        </Route>
                        <Route path="*">
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default Application;


