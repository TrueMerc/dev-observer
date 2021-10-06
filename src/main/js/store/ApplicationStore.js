import React from "react";
import { makeObservable, observable, action } from "mobx";
import {User} from "../domain/User";

export class ApplicationStore {

    isReady = false;
    serverUrl = null;
    settingsUrl = 'settings';
    usersUrl = 'users';
    currentUserUrl = `${this.usersUrl}/currentUser`;
    videoStreamUrl = null;
    firmwareControllerUrl = null;
    user = null;

    constructor(serverUrl) {
        makeObservable(this, {
            isReady: observable,
            serverUrl: observable,
            videoStreamUrl: observable,
            firmwareControllerUrl: observable,
            user: observable,
            loadSettings: action,
            loadUser: action
        });
        this.serverUrl = new URL(serverUrl);
        this.settingsUrl = new URL(this.settingsUrl, serverUrl);
        this.usersUrl = new URL(this.usersUrl, serverUrl);
        this.currentUserUrl = new URL(this.currentUserUrl, serverUrl);
    }

    loadSettings() {
        this.isReady = false;
        fetch(`${this.settingsUrl}`, {
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
                throw new Error(`Can't download application settings: server responded with code ${response.status}`);
            }
        }).then(json => {
            this.firmwareControllerUrl = new URL(json.firmwareControllerUrl, this.serverUrl);
            const videoStreamServerUrl = this.serverUrl;
            videoStreamServerUrl.port = json.videoStreamPort;
            this.videoStreamUrl = new URL(json.videoStreamUrl, videoStreamServerUrl);
            this.isReady = true;
        }).catch(error => {
            console.error(error);
        });
    }

    loadUser() {
        this.isReady = false;
        fetch(`${this.currentUserUrl}`, {
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
               throw new Error(`Can't load current user data`);
            }
        }).then(json => {
            this.user = new User(json);
        }).catch(error => {
            console.error(error)
        });
    }
}