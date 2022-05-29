package ru.devobserver.configurations.video;

import org.springframework.boot.context.properties.ConstructorBinding;

@ConstructorBinding
public class NetworkProperties {
    private final String url;
    private final int port;

    public NetworkProperties(String url, int port) {
        this.url = url;
        this.port = port;
    }

    public String getUrl() {
        return url;
    }

    public int getPort() {
        return port;
    }
}
