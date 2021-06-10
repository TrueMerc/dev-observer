import React from "react";
import { makeObservable, observable, action } from "mobx";

export class ApplicationStore {

    isReady = false;
    serverUrl = '';
    settingsUrl = 'settings';
    videoStreamUrl = '';
    firmwareControllerUrl = '';

    constructor(serverUrl) {
        makeObservable(this, {
            isReady: observable,
            serverUrl: observable,
            videoStreamUrl: observable,
            firmwareControllerUrl: observable,
            loadSettings: action
        });
        this.serverUrl = serverUrl;
        this.settingsUrl = `${this.serverUrl}${this.settingsUrl}`
    }

    loadSettings() {
        this.isReady = false;
        fetch(`${this.serverUrl}${this.settingsUrl}`, {
            method: 'GET',
            mode: 'same-origin',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(response.ok) {
                return response.json();
            }
        }).then(json => {
            this.firmwareControllerUrl = `${this.serverUrl}${json.firmwareControllerUrl}`;
            this.videoStreamUrl = `${this.serverUrl}${json.videoStreamUrl}`;
            this.isReady = true;
        }).catch(error => {
            console.error(error);
        });
    }
}