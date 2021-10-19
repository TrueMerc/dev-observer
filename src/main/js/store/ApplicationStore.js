import React from "react";
import {makeObservable, observable, action, runInAction} from "mobx";
import {User} from "../domain/User";

export class ApplicationStore {

    isReady = false;
    serverUrl = null;
    settingsUrl = 'settings';
    usersUrl = 'users';
    currentUserUrl = `${this.usersUrl}/currentUser`;
    videoStreamUrl = 'stream';
    firmwareControllerUrl = 'firmware';
    maxFirmwareSize = '';
    user = null;
    roles = [];

    constructor(serverUrl) {
        makeObservable(this, {
            isReady: observable,
            videoStreamUrl: observable,
            firmwareControllerUrl: observable,
            user: observable,
            roles: observable,
            maxFirmwareSize: observable,
            loadSettings: action,
            loadUser: action
        });
        this.serverUrl = Object.assign(new URL(serverUrl));
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
            console.log(json.maxUploadedFileSize);
            runInAction(() => {
                this.firmwareControllerUrl = new URL(json.firmwareControllerUrl, this.serverUrl);
                const videoStreamServerUrl = this.serverUrl;
                videoStreamServerUrl.port = 8081;
                this.videoStreamUrl = new URL(json.videoStreamUrl, videoStreamServerUrl);
                this.roles = json.roles;
                this.maxFirmwareSize = json.maxUploadedFileSize;
                this.isReady = true;
            })
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
            runInAction(() => {
                this.user = new User(json);
                this.isReady = true;
            });
        }).catch(error => {
            console.error(error);
        });
    }
}