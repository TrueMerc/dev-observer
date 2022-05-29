package ru.devobserver.configurations.video;

import org.springframework.boot.context.properties.ConstructorBinding;

@ConstructorBinding
public class PlatformProperties {
    private final String device;

    private final int threadsCount;

    public PlatformProperties(String device, int threadsCount) {
        this.device = device;
        this.threadsCount = threadsCount;
    }

    public String getDevice() {
        return device;
    }

    public int getThreadsCount() {
        return threadsCount;
    }
}
