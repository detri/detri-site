// weakaudio.js - Web Audio API wrapper
// by Aaron Dosser
// based on buffaudio by Ernie Park
// updated Sept 29, 2017

class WeakAudio {
    constructor(context, buffer) {
        this.context = context;
        this.buffer = buffer;
        this.gainNode = (context.createGain || context.createGainNode)();
        this.source;

        this.playbackTime = 0; // s
        this.playing = false;
    }

    // Stop any playback and load a new buffer
    newBuffer(buffer) {
        this.stop();
        this.buffer = buffer;
        this.bufferLength = buffer.duration;
        this.playbackTime = 0;
    }

    // Initialize a new source - required for seeking
    // AudioBufferSourceNodes cannot be started twice even if stopped
    newSource() {
        this.source = this.context.createBufferSource();
        //browser compatibility
        this.source.start = (this.source.start || this.source.noteOn);
        this.source.stop = (this.source.stop || this.source.noteOff);

        this.source.buffer = this.buffer;
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);

        this.source.onended = () => {
            if (this.playing) this.playbackTime = 0;
            this.playing = false;
        }
    }

    // Starts or resumes a buffer
    play() {
        if (this.context.state == "suspended") {
            this.context.resume();
            this.playing = true;
        }
        if (!this.playing) {
            this.newSource();
            this.source.start(0, this.playbackTime);
            this.playing = true;
        }
    }

    // Stops a buffer (forever)
    stop() {
        this.source.stop(0);
        this.playing = false;
        this.playbackTime = 0;
    }

    // Pause the AudioContext
    pause() {
        if (this.context.state == "running") {
            this.context.suspend();
            this.playing = false;
        }
    }

    // Seeking! Experimental.
    seek(playbackTime) {
        if (playbackTime > this.buffer.duration) {
            console.log("Error: Seek time is greater than audio buffer duration.");
        }

        if (this.playing) {
            this.stop();
            this.playbackTime = playbackTime;
            this.play();
        } else {
            this.playbackTime = playbackTime;
        }
    }

}

module.exports = WeakAudio;