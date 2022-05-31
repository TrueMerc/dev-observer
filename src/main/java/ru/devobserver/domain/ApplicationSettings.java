package ru.devobserver.domain;

import lombok.Getter;
import ru.devobserver.configurations.ApplicationProperties;
import ru.devobserver.configurations.video.NetworkProperties;

@Getter
public class ApplicationSettings {
    private final String firmwareControllerUrl;

    private final NetworkProperties videoProperties;

    private final String maxUploadedFileSize;
    private final ApplicationEntities applicationEntities;

    public ApplicationSettings(
            final ApplicationProperties properties,
            final ApplicationEntities applicationEntities
    ) {
        this.videoProperties = properties.getVideo().getNetwork();
        this.firmwareControllerUrl = properties.getFirmware().getControllerUrl();
        this.maxUploadedFileSize = properties.getFirmware().getMaxSize();
        this.applicationEntities = applicationEntities;
    }
}
