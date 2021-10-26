package ru.devobserver.domain;

import lombok.Getter;
import ru.devobserver.configurations.ApplicationProperties;
import ru.devobserver.dto.RoleDTO;

import java.util.List;

@Getter
public class ApplicationSettings {
    private final String firmwareControllerUrl;
    private final String videoStreamUrl;
    private final int videoStreamPort;
    private final String maxUploadedFileSize;
    private final List<RoleDTO> roles;

    public ApplicationSettings(final ApplicationProperties properties, final List<RoleDTO> roles) {
        this.videoStreamUrl = properties.getVideoStreamUrl();
        this.firmwareControllerUrl = properties.getFirmwareControllerUrl();
        this.videoStreamPort = properties.getVideoStreamPort();
        this.maxUploadedFileSize = properties.getFirmwareMaxFileSize();
        this.roles = roles;
    }
}
