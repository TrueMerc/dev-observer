import React from "react";
import { makeObservable, observable, action } from "mobx";

export class ApplicationStore {

    isReady = false;
    serverUrl = null;
    settingsUrl = 'settings';
    videoStreamUrl = null;
    firmwareControllerUrl = null;

    constructor(serverUrl) {
        console.log(`${this.serverUrl}`);
        makeObservable(this, {
            isReady: observable,
            serverUrl: observable,
            videoStreamUrl: observable,
            firmwareControllerUrl: observable,
            loadSettings: action
        });
        this.serverUrl = new URL(serverUrl);
        this.settingsUrl = new URL(this.settingsUrl, serverUrl);
    }

    loadSettings() {
        this.isReady = false;
        console.log(`${this.settingsUrl}`);
        fetch(`${this.settingsUrl}`, {
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
            this.firmwareControllerUrl = new URL(json.firmwareControllerUrl, this.serverUrl);
            const videoStreamServerUrl = this.serverUrl;
            videoStreamServerUrl.port = json.videoStreamPort;
            console.log(videoStreamServerUrl);
            console.log(json.videoStreamUrl);
            console.log(json.videoStreamPort);
            this.videoStreamUrl = new URL(json.videoStreamUrl, videoStreamServerUrl);
            this.isReady = true;
        }).catch(error => {
            console.error(error);
        });
    }
}