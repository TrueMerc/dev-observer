import React from "react";
import {makeObservable, observable, action, runInAction} from "mobx";
import {User} from "../domain/User";
import "regenerator-runtime/runtime";

export class ApplicationStore {

    isReady = false;
    serverUrl = null;
    settingsUrl = 'settings';
    usersUrl = 'users';
    currentUserUrl = `${this.usersUrl}/currentUser`;
    videoStreamUrl = '';
    firmwareControllerUrl = 'firmware';
    labWorksControllerUrl = 'api/labs';
    maxFirmwareSize = '';
    user = null;
    roles = [];
    laboratoryIdentifiersAndNames = [];

    constructor(serverUrl) {
        makeObservable(this, {
            isReady: observable,
            videoStreamUrl: observable,
            firmwareControllerUrl: observable,
            labWorksControllerUrl: observable,
            user: observable,
            roles: observable,
            maxFirmwareSize: observable,
            laboratoryIdentifiersAndNames: observable,
            load: action,
            loadSettings: action,
            loadUser: action
        });
        this.serverUrl = Object.assign(new URL(serverUrl));
        this.settingsUrl = new URL(this.settingsUrl, serverUrl);
        this.usersUrl = new URL(this.usersUrl, serverUrl);
        this.currentUserUrl = new URL(this.currentUserUrl, serverUrl);
    }

    load() {
        this.isReady = false;
        this.loadSettings().then(() => {
            this.loadUser().then(() => {
                runInAction(() => {
                    console.log("Uploading completed.");
                    this.isReady = true;
                })
            })
        });
    }

    async loadSettings() {
        await fetch(`${this.settingsUrl}`, {
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
            runInAction(() => {
                console.log(json);
                this.firmwareControllerUrl = new URL(json.firmwareControllerUrl, this.serverUrl);
                this.labWorksControllerUrl = new URL(this.labWorksControllerUrl, this.serverUrl);
                const videoStreamServerUrl = this.serverUrl;
                videoStreamServerUrl.port = 8081;
                this.videoStreamUrl = new URL(json.videoStreamUrl, videoStreamServerUrl);
                this.roles = json.applicationEntities.roles;
                this.maxFirmwareSize = json.maxUploadedFileSize;
                this.laboratoryIdentifiersAndNames = json.applicationEntities.laboratoryIdentifiersAndNames;
                this.isReady = true;
                console.log('Settings are loaded');
                console.log(this);
            })
        }).catch(error => {
            console.error(error);
        });
    }

    async loadUser() {
        await fetch(`${this.currentUserUrl}`, {
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
                console.log('User is loaded');
            });
        }).catch(error => {
            console.error(error);
        });
    }
}