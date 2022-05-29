package ru.devobserver.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.devobserver.configurations.ApplicationProperties;
import ru.devobserver.configurations.video.PlatformProperties;
import ru.devobserver.configurations.video.StreamProperties;
import ru.devobserver.configurations.video.VideoProperties;
import uk.co.caprica.vlcj.factory.MediaPlayerFactory;
import uk.co.caprica.vlcj.player.base.MediaPlayer;

/**
 * Provides video service implementation using VLC-J library.
 */
@Service
public class VlcJVideoStreamService implements VideoStreamService {

    private static final String MEDIA_PATTERN = "v4l2://%s";

    private static final String THREADS_COUNT_PATTERN="threads=%d";

    private static final String FPS_OPTION_PATTERN = ":v4l2-fps=%d";

    private static final String WIDTH_OPTION_PATTERN = ":v4l2-width=%d";

    private static final String HEIGHT_OPTION_PATTERN = ":v4l2-height=%d";

    private final MediaPlayer mediaPlayer;

    private final VideoProperties videoProperties;

    @Autowired
    public VlcJVideoStreamService(final VideoProperties videoProperties) {
        final MediaPlayerFactory mediaPlayerFactory = new MediaPlayerFactory();
        this.mediaPlayer = mediaPlayerFactory.mediaPlayers().newEmbeddedMediaPlayer();
        this.videoProperties = videoProperties;
    }

    @Override
    public void start() {
        final PlatformProperties platform = videoProperties.getPlatform();
        final String media = String.format(MEDIA_PATTERN, platform.getDevice());
        final StreamProperties streamProperties = videoProperties.getStream();
        final String[] options = {
                ":sout=#transcode{" +
                        "vcodec=VP80,vb=2048,scale=1,acodec=vorb," +
                        "ab=128," +
                        "channels=2," +
                        "samplerate=44100," +
                        "scodec=none," +
                        String.format(THREADS_COUNT_PATTERN, platform.getThreadsCount()) +
                        "}:" + getDestinationString(),
                ":no-sout-all",
                ":sout-keep",
                String.format(FPS_OPTION_PATTERN, streamProperties.getFps()),
                String.format(WIDTH_OPTION_PATTERN, streamProperties.getWidth()),
                String.format(HEIGHT_OPTION_PATTERN, streamProperties.getHeight()),
                ":network-caching=300",
        };
        mediaPlayer.media().play(media,options);
    }

    @Override
    public void stop() {
        mediaPlayer.controls().stop();
    }

    private final String getDestinationString() {
        final String endPoint = videoProperties.getNetwork().getUrl();
        final int port = videoProperties.getNetwork().getPort();
        final String networkDestination = String.format("dst=:%d/%s", port, endPoint);
        final String destinationStringPattern = videoProperties.isDuplicatedOnDisplay()
                ? "duplicate{dst=http{mux=webm,%s},dst=display}"
                : "duplicate{dst=http{mux=webm,%s}}";
        return String.format(destinationStringPattern, networkDestination);
    }
}
