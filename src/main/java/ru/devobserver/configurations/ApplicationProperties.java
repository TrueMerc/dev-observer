package ru.devobserver.configurations;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("application")
public class ApplicationProperties {
    private String firmwareFolder;
    private String firmwareControllerUrl;
    private String videoStreamUrl;

    public String getFirmwareFolder() {
        return firmwareFolder;
    }

    public void setFirmwareFolder(String firmwareFolder) {
        this.firmwareFolder = firmwareFolder;
    }

    public String getFirmwareControllerUrl() {
        return firmwareControllerUrl;
    }

    public void setFirmwareControllerUrl(String firmwareControllerUrl) {
        this.firmwareControllerUrl = firmwareControllerUrl;
    }

    public String getVideoStreamUrl() {
        return videoStreamUrl;
    }

    public void setVideoStreamUrl(String videoStreamUrl) {
        this.videoStreamUrl = videoStreamUrl;
    }
}
