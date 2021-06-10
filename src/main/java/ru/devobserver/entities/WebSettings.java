package ru.devobserver.entities;

import lombok.Getter;

@Getter
public class WebSettings {
    private final String firmwareControllerUrl;
    private final String videoStreamUrl;


    public WebSettings(final String firmwareControllerUrl, final String videoStreamUrl) {
        this.videoStreamUrl = videoStreamUrl;
        this.firmwareControllerUrl = firmwareControllerUrl;
    }
}
