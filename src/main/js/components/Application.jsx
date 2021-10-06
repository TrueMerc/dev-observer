import React, {useEffect} from "react";
import {observer} from "mobx-react";
import LabWorkPage from "./LabWorkPage.jsx";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {Header} from "./Header.jsx";
import {LeftBar} from "./LeftBar.jsx";
import {DeviceDescription} from "./DeviceDescription.jsx";
import {ApplicationStore} from "../store/ApplicationStore";
import {UserProfile} from "./UserProfile.jsx";

const Application = observer(() => {

    const applicationStore = new ApplicationStore(document.documentURI);

    useEffect(() => {
        applicationStore.loadSettings();
        applicationStore.loadUser();
    }, []);

    return (
        <BrowserRouter>
            <div className='application'>
                <Header applicationStore = {applicationStore}/>
                <div className='main-section'>
                    <LeftBar/>
                    <Switch>
                        <Route path="/" exact>
                            <LabWorkPage applicationStore = {applicationStore} />
                        </Route>
                        <Route path="/description">
                            <DeviceDescription/>
                        </Route>
                        <Route path="/profile">
                            <UserProfile applicationStore = {applicationStore}/>
                        </Route>
                        <Route path="*">
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
});

export default Application;


