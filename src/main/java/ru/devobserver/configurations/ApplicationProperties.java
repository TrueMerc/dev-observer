package ru.devobserver.configurations;


import org.springframework.boot.context.properties.ConfigurationProperties;


@ConfigurationProperties("application")
public class ApplicationProperties {
    private String folder;

    public String getFolder() {
        return folder;
    }

    public void setFolder(String folder) {
        this.folder = folder;
    }
}
