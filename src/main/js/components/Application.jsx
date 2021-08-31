import React from "react";
import {observer} from "mobx-react";
import DevicePage from "./DevicePage.jsx";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {Header} from "./Header.jsx";
import {LeftBar} from "./LeftBar.jsx";

const Application = observer(() => {
    return (
        <BrowserRouter>
            <div className='application'>
                <Header/>
                <div className='main-section'>
                    <LeftBar/>
                    <Switch>
                        <Route path="/" exact>
                            <DevicePage />
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


