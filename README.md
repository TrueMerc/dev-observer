# dev-observer
Application for remote control on study board firmware

## VLC setting
Application use VLC video player to show study board for students.
Default stream settings for VLC video player:

vlc v4l2:///dev/video0 \
 --sout='#transcode{vcodec=theo,vb=256,fps=25,acodec=vorb,ab=128,channels=2,samplerate=44100,scodec=none}:http{mux=ogg,dst=:8081/stream}'
