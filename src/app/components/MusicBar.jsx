import React from 'react';
import { connect } from 'react-redux';
import {
  play,
  pause,
  updateProgress
} from '../ducks/musicPlayer';
import styled from 'styled-components';
import PlayButton from './PlayButton.jsx';
import ProgressBar from './ProgressBar.jsx';
import SongTime from './SongTime.jsx';
import Visualizer from './Visualizer.jsx';

const Controls = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 3em 0 3em;
`;

class MusicBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { progress: 0 };

    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.togglePlay = this.togglePlay.bind(this);
    this.update = this.update.bind(this);
    this.audioInit = false;
  }

  togglePlay() {
    const audioEl = this.audioElement || false;
    if (audioEl && this.props.curSong) {
      if (this.props.playing && !audioEl.paused) {
        this.props.pause();
        audioEl.pause();
      } else if (!this.props.playing && audioEl.paused) {
        this.props.play();
        audioEl.play();
      }
    }
  }

  update() {
    const audioEl = this.audioElement || false;
    if (audioEl) {
      if (audioEl.duration && audioEl.currentTime && !audioEl.paused) {
        this.analyser.getByteFrequencyData(this.fftData);
        this.setState.bind(this)({
          ...this.state,
          progress: audioEl.currentTime / audioEl.duration * 100,
          freqData: this.fftData
        });
      }
      if (this.props.playing && audioEl.paused) {
        audioEl.play();
      } else if (!this.props.playing && !audioEl.paused) {
        audioEl.pause();
      }
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <audio ref={e => {
          if (!this.audioInit) {
            this.audioElement = e;
            this.source = this.audioCtx.createMediaElementSource(this.audioElement);
            this.gainNode = this.audioCtx.createGain();
            this.analyser = this.audioCtx.createAnalyser();
            this.analyser.fftSize = 256;
            this.fftData = new Uint8Array(this.analyser.frequencyBinCount);
            this.source.connect(this.analyser);
            this.analyser.connect(this.gainNode);
            this.gainNode.connect(this.audioCtx.destination);
            setInterval(this.update.bind(this), 25);
            this.audioInit = true;
          }
        }} src={this.props.curSong && this.props.curSong.url} onEnded={this.props.pause} />
        <Controls>
          <a onClick={this.togglePlay}>
            <PlayButton playing={this.props.playing || false} />
          </a>
          <ProgressBar width={this.state.progress} audioEl={this.audioElement} curSong={this.props.curSong} />
          <SongTime currentTime={this.audioElement ? this.audioElement.currentTime : 0} duration={this.audioElement ? this.audioElement.duration : 0} />
          <Visualizer fftData={this.state.freqData || null} />
        </Controls>
      </div>
    );
  }
}

export default connect(state => ({
  ...state.musicPlayer
}), {
    play,
    pause,
    updateProgress
  })(styled(MusicBar)`
  box-sizing: border-box;
  height: 4.5em;
  width: 100%;
  background: ${props => props.theme.secondary};
  position: fixed;
  left: 0;
  bottom: 0;
`);