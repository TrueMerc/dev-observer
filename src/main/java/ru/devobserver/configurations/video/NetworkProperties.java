package ru.devobserver.configurations.video;

import org.springframework.boot.context.properties.ConstructorBinding;

@ConstructorBinding
public class NetworkProperties {

    private final String url;
    private final String endPoint;
    private final int port;

    public NetworkProperties(final String url, final String endPoint, final int port) {
        this.url = url;
        this.endPoint = endPoint;
        this.port = port;
    }

    public String getUrl() {
        return url;
    }

    public String getEndPoint() {
        return endPoint;
    }

    public int getPort() {
        return port;
    }
}
