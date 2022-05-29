package ru.devobserver.configurations;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;
import ru.devobserver.configurations.firmware.FirmwareProperties;
import ru.devobserver.configurations.video.VideoProperties;

@ConfigurationProperties("application")
@ConstructorBinding
public class ApplicationProperties {

    private final FirmwareProperties firmware;

    private final VideoProperties video;

    private final String laboratoriesFolder;

    public ApplicationProperties(
            final FirmwareProperties firmware,
            final VideoProperties video,
            final String laboratoriesFolder) {
        this.firmware = firmware;
        this.video = video;
        this.laboratoriesFolder = laboratoriesFolder;
    }

    public FirmwareProperties getFirmware() {
        return firmware;
    }

    public VideoProperties getVideo() {
        return video;
    }

    public String getLaboratoriesFolder() {
        return laboratoriesFolder;
    }
}
