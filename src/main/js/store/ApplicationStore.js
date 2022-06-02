import React from "react";
import {action, makeObservable, observable, runInAction} from "mobx";
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
    deviceControllerUrl='api/devices';
    hardwareControllerUrl='api/hardware';
    maxFirmwareSize = '';
    user = null;
    roles = [];
    deviceModes = [];
    devices = [];
    laboratoryIdentifiersAndNames = [];

    constructor(serverUrl) {
        makeObservable(this, {
            isReady: observable,
            videoStreamUrl: observable,
            firmwareControllerUrl: observable,
            labWorksControllerUrl: observable,
            deviceControllerUrl: observable,
            hardwareControllerUrl: observable,
            user: observable,
            roles: observable,
            deviceModes: observable,
            devices: observable,
            maxFirmwareSize: observable,
            laboratoryIdentifiersAndNames: observable,
            load: action,
            loadSettings: action,
            loadUser: action,
            updateDeviceMode: action
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
                this.deviceControllerUrl = new URL(this.deviceControllerUrl, this.serverUrl);
                this.hardwareControllerUrl = new URL(this.hardwareControllerUrl, this.serverUrl);
                this.videoStreamUrl = this.videoStreamServerUrl(this.serverUrl, json.videoProperties);
                console.log(this.videoStreamUrl);
                this.roles = json.applicationEntities.roles;
                this.deviceModes = json.applicationEntities.deviceModes;
                this.devices = json.applicationEntities.devices;
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

    updateDeviceMode = async (deviceId, deviceModeId) => {
        const url = `${this.deviceControllerUrl}/updateDeviceMode/${deviceId}/${deviceModeId}`;
        //const jsonRequest = new JsonRequest(url, "PUT");
        // const result = await jsonRequest.execute();
        await fetch(url, {
            method: 'PUT',
            mode: 'same-origin',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Can't retrieve a response from server. Response status: ${response.status}`);
            }
        }).then(json => {
            runInAction(() => {
                const newDevices = this.devices.slice(0);
                const deviceForRemovalIdx = this.devices.findIndex(device => device.id === json.id);
                newDevices.splice(deviceForRemovalIdx, 1, json);
                // Reference in this field should be updated because we want that observer works.
                this.devices = newDevices;
            })
        }).catch(error => {
            console.error(error);
        });
    }

    videoStreamServerUrl = (currentServerUrl, videoProperties) => {
        const localhostNames = ["localhost", "127.0.0.1"];
        const hostname = currentServerUrl.hostname;
        if (localhostNames.some(name => name.localeCompare(hostname) === 0)) {
            const videoStreamServerUrl = currentServerUrl;
            videoStreamServerUrl.port = videoProperties.port;
            return new URL(videoProperties.endPoint, videoStreamServerUrl);
        } else {
            return new URL(videoProperties.url);
        }
    }
}