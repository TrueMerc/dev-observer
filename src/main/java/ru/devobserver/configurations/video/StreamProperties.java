package ru.devobserver.configurations.video;

import org.springframework.boot.context.properties.ConstructorBinding;

@ConstructorBinding
public class StreamProperties {
    private final int fps;

    private final int width;

    private final int height;

    public StreamProperties(int fps, int width, int height) {
        this.fps = fps;
        this.width = width;
        this.height = height;
    }

    public int getFps() {
        return fps;
    }

    public int getWidth() {
        return width;
    }

    public int getHeight() {
        return height;
    }
}
