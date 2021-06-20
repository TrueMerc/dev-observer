# dev-observer
Application for remote control on study board firmware

## VLC setting
Application use VLC video player to show study board for students.
Default stream settings for VLC video player:

cvlc 'v4l2:///dev/video0:v4l2-standard=ALL :input-slave=alsa://hw:0,0 :v4l2-dev=/dev/video0 :v4l2-vbidev= :v4l2-chroma= :v4l2-input=0 :v4l2-audio-input=-1 :v4l2-width=640 :v4l2-height=480 :v4l2-aspect-ratio=4\:3 :v4l2-fps=25 :v4l2-radio-dev=/dev/radio0 :v4l2-tuner-frequency=-1 :v4l2-tuner-audio-mode=3 :no-v4l2-controls-reset :v4l2-brightness=-1 :v4l2-brightness-auto=-1 :v4l2-contrast=-1 :v4l2-saturation=-1 :v4l2-hue=-1 :v4l2-hue-auto=-1 :v4l2-white-balance-temperature=-1 :v4l2-auto-white-balance=-1 :v4l2-red-balance=-1 :v4l2-blue-balance=-1 :v4l2-gamma=-1 :v4l2-autogain=-1 :v4l2-gain=-1 :v4l2-sharpness=-1 :v4l2-chroma-gain=-1 :v4l2-chroma-gain-auto=-1 :v4l2-power-line-frequency=-1 :v4l2-backlight-compensation=-1 :v4l2-band-stop-filter=-1 :no-v4l2-hflip :no-v4l2-vflip :v4l2-rotate=-1 :v4l2-color-killer=-1 :v4l2-color-effect=-1 :v4l2-audio-volume=-1 :v4l2-audio-balance=-1 :no-v4l2-audio-mute :v4l2-audio-bass=-1 :v4l2-audio-treble=-1 :no-v4l2-audio-loudness :v4l2-set-ctrls= :live-caching=50 :network-caching=50' \
--sout='#transcode{vcodec=theo,vb=1600,acodec=vorb,ab=128,channels=2,samplerate=44100,scodec=none}:http{mux=ogg,dst=:8081/stream}'

