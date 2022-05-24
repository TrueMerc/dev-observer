package ru.devobserver.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.devobserver.configurations.ApplicationProperties;
import uk.co.caprica.vlcj.factory.MediaPlayerFactory;
import uk.co.caprica.vlcj.player.base.MediaPlayer;

/**
 * Provides video service implementation using VLC-J library.
 */
@Service
public class VlcJVideoStreamService implements VideoStreamService {

    private static final String MEDIA_PATTERN = "v4l2://%s";

    private static final String FPS_OPTION_PATTERN = ":v4l2-fps=%d";

    private static final String WIDTH_OPTION_PATTERN = ":v4l2-width=%d";

    private static final String HEIGHT_OPTION_PATTERN = ":v4l2-height=%d";
    private final MediaPlayer mediaPlayer;

    private final ApplicationProperties applicationProperties;

    @Autowired
    public VlcJVideoStreamService(final ApplicationProperties applicationProperties) {
        final MediaPlayerFactory mediaPlayerFactory = new MediaPlayerFactory();
        this.mediaPlayer = mediaPlayerFactory.mediaPlayers().newEmbeddedMediaPlayer();
        this.applicationProperties = applicationProperties;
    }

    @Override
    public void start() {
        final String media = String.format(MEDIA_PATTERN, applicationProperties.getVideoDevice());
        final String[] options = {
                ":sout=#transcode{" +
                        "vcodec=VP80,vb=2048,scale=1,acodec=vorb," +
                        "ab=128," +
                        "channels=2," +
                        "samplerate=44100," +
                        "scodec=none" +
                        "}:duplicate{dst=http{mux=webm,dst=:8081/stream},dst=display}",
                ":no-sout-all",
                ":sout-keep",
                String.format(FPS_OPTION_PATTERN, applicationProperties.getVideoStreamFPS()),
                String.format(WIDTH_OPTION_PATTERN, applicationProperties.getVideoStreamWidth()),
                String.format(HEIGHT_OPTION_PATTERN, applicationProperties.getVideoStreamHeight()),
                ":network-caching=300",
        };
        mediaPlayer.media().play(media,options);
    }

    @Override
    public void stop() {
        mediaPlayer.controls().stop();
    }
}
