package ru.devobserver.configurations;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("application")
public class ApplicationProperties {
    private String firmwareFolder;
    private String firmwareControllerUrl;
    @Value("${spring.servlet.multipart.max-file-size}")
    private String firmwareMaxFileSize;
    private String videoStreamUrl;
    private int videoStreamPort;

    private String videoDevice;

    private int videoStreamFPS;

    private int videoStreamWidth;

    private int videoStreamHeight;
    private String scriptPath;
    private String scriptWorkingDirectory;
    private String laboratoriesFolder;

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

    public int getVideoStreamPort() {
        return videoStreamPort;
    }

    public void setVideoStreamPort(int videoStreamPort) {
        this.videoStreamPort = videoStreamPort;
    }

    public String getVideoDevice() {
        return videoDevice;
    }

    public void setVideoDevice(String videoDevice) {
        this.videoDevice = videoDevice;
    }

    public int getVideoStreamFPS() {
        return videoStreamFPS;
    }

    public void setVideoStreamFPS(int videoStreamFPS) {
        this.videoStreamFPS = videoStreamFPS;
    }

    public int getVideoStreamWidth() {
        return videoStreamWidth;
    }

    public void setVideoStreamWidth(int videoStreamWidth) {
        this.videoStreamWidth = videoStreamWidth;
    }

    public int getVideoStreamHeight() {
        return videoStreamHeight;
    }

    public void setVideoStreamHeight(int videoStreamHeight) {
        this.videoStreamHeight = videoStreamHeight;
    }

    public String getScriptPath() {
        return scriptPath;
    }

    public void setScriptPath(String scriptPath) {
        this.scriptPath = scriptPath;
    }

    public String getScriptWorkingDirectory() {
        return scriptWorkingDirectory;
    }

    public void setScriptWorkingDirectory(String scriptWorkingDirectory) {
        this.scriptWorkingDirectory = scriptWorkingDirectory;
    }

    public String getFirmwareMaxFileSize() {
        return firmwareMaxFileSize;
    }

    public void setFirmwareMaxFileSize(String firmwareMaxFileSize) {
        this.firmwareMaxFileSize = firmwareMaxFileSize;
    }

    public String getLaboratoriesFolder() {
        return laboratoriesFolder;
    }

    public void setLaboratoriesFolder(String laboratoriesFolder) {
        this.laboratoriesFolder = laboratoriesFolder;
    }
}
