package ru.devobserver.configurations;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("application")
public class ApplicationProperties {
    private String firmwareFolder;
    private String firmwareControllerUrl;
    @Value("${spring.http.multipart.max-file-size}")
    private String firmwareMaxFileSize;
    private String videoStreamUrl;
    private int videoStreamPort;
    private String scriptPath;
    private String scriptWorkingDirectory;

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
}
