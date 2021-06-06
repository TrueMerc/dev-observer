package ru.devobserver.entities;

import lombok.Getter;

@Getter
public class WebSettings {
    private final String videoStreamUrl;

    public WebSettings(final String videoStreamUrl) {
        this.videoStreamUrl = videoStreamUrl;
    }
}
