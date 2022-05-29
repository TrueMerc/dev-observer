package ru.devobserver.configurations.firmware;

import org.springframework.boot.context.properties.ConstructorBinding;

@ConstructorBinding
public class ScriptProperties {
    private final String path;
    private final String workingDirectory;

    public ScriptProperties(String path, String workingDirectory) {
        this.path = path;
        this.workingDirectory = workingDirectory;
    }

    public String getPath() {
        return path;
    }

    public String getWorkingDirectory() {
        return workingDirectory;
    }
}
