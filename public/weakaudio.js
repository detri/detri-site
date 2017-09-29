class WeakAudio {
    constructor(context, buffer) {
        this.context = context;
        this.buffer = buffer;
        this.gainNode = (context.createGain || context.createGainNode)();
        this.source;

        this.playbackTime = 0; // s
        this.playing = false;
    }

    newBuffer(buffer) {
        this.stop();
        this.buffer = buffer;
        this.bufferLength = buffer.duration;
        this.playbackTime = 0;
    }

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

    stop() {
        this.source.stop(0);
        this.playing = false;
        this.playbackTime = 0;
    }

    pause() {
        if (this.context.state == "running") {
            this.context.suspend();
            this.playing = false;
        }
    }

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