package ru.devobserver.configurations.firmware;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@ConfigurationProperties(prefix = "application.firmware")
@ConstructorBinding
public class FirmwareProperties {

    private final String folder;

    private final String controllerUrl;

    private final String maxSize;

    private final ScriptProperties script;

    public FirmwareProperties(
            final String folder,
            final String controllerUrl,
            final @Value("10MB") String maxSize,
            final ScriptProperties script) {
        this.folder = folder;
        this.controllerUrl = controllerUrl;
        this.maxSize = maxSize;
        this.script = script;
    }

    public String getFolder() {
        return folder;
    }

    public String getControllerUrl() {
        return controllerUrl;
    }

    public String getMaxSize() {
        return maxSize;
    }

    public ScriptProperties getScript() {
        return script;
    }
}
