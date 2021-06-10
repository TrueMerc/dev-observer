package ru.devobserver.entities;

import lombok.Getter;

@Getter
public class WebSettings {
    private final String firmwareControllerUrl;
    private final String videoStreamUrl;
    private final int videoStreamPort;

    public WebSettings(
            final String firmwareControllerUrl,
            final String videoStreamUrl,
            final int videoStreamPort
    ) {
        this.videoStreamUrl = videoStreamUrl;
        this.firmwareControllerUrl = firmwareControllerUrl;
        this.videoStreamPort = videoStreamPort;
    }
}
