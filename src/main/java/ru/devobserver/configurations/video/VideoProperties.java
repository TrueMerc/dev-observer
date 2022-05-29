package ru.devobserver.configurations.video;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@ConfigurationProperties(prefix = "application.video")
@ConstructorBinding
public class VideoProperties {

    private PlatformProperties platform;
    private final NetworkProperties network;
    private final StreamProperties stream;

    private final boolean duplicatedOnDisplay;

    public VideoProperties(
            final PlatformProperties platform,
            final NetworkProperties network,
            final StreamProperties stream,
            final boolean duplicatedOnDisplay) {
        this.platform = platform;
        this.network = network;
        this.stream = stream;
        this.duplicatedOnDisplay = duplicatedOnDisplay;
    }

    public PlatformProperties getPlatform() {
        return platform;
    }

    public NetworkProperties getNetwork() {
        return network;
    }

    public StreamProperties getStream() {
        return stream;
    }

    public boolean isDuplicatedOnDisplay() {
        return duplicatedOnDisplay;
    }
}
