package ru.devobserver.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.co.caprica.vlcj.factory.MediaPlayerFactory;
import uk.co.caprica.vlcj.player.base.MediaPlayer;

/**
 * Provides video service implementation using VLC-J library.
 */
@Service
public class VlcJVideoStreamService implements VideoStreamService {
    private final MediaPlayer mediaPlayer;

    @Autowired
    public VlcJVideoStreamService() {
        final MediaPlayerFactory mediaPlayerFactory = new MediaPlayerFactory();
        this.mediaPlayer = mediaPlayerFactory.mediaPlayers().newEmbeddedMediaPlayer();
    }

    @Override
    public void start() {
        final String media = "v4l2:///dev/video0";
        final String[] options = {
                ":sout=#transcode{" +
                        "vcodec=theo,vb=4096,scale=1,acodec=vorb," +
                        "ab=128," +
                        "channels=2," +
                        "samplerate=44100," +
                        "scodec=none" +
                        "}:duplicate{dst=http{mux=ogg,dst=:8081/stream},dst=display}",
                ":sout-all",
                ":sout-keep",
                ":v4l2-fps=25",
                ":v4l2-width=640",
                ":v4l2-height=480"
        };
        mediaPlayer.media().play(media,options);
    }

    @Override
    public void stop() {
        mediaPlayer.controls().stop();
    }
}
