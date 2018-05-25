import React from 'react';
import { connect } from 'react-redux';
import {
  play,
  pause
} from '../ducks/musicPlayer';
import styled from 'styled-components';
import PlayButton from './PlayButton.jsx';

const Controls = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 9em 0 9em;
`;

class MusicBar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.togglePlay = this.togglePlay.bind(this);
    this.audioInit = false;
  }

  togglePlay() {
    const audioEl = this.audioElement || false;
    if (audioEl) {
      if (this.props.playing && !audioEl.paused) {
        this.props.pause();
        audioEl.pause();
      } else if (!this.props.playing && audioEl.paused) {
        this.props.play();
        audioEl.play();
      }
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <audio ref={e => {
          if (!this.audioInit) {
            this.audioElement = e
            this.source = this.audioCtx.createMediaElementSource(this.audioElement);
            this.gainNode = this.audioCtx.createGain();
            this.analyser = this.audioCtx.createAnalyser();
            this.source.connect(this.analyser);
            this.analyser.connect(this.gainNode);
            this.gainNode.connect(this.audioCtx.destination);
            this.audioInit = true;
          }
        }} src='/songs/31964b14-ceb1-4581-b6a1-1823c2a3b1bf.mp3'/>
        <Controls>
          <a onClick={this.togglePlay}><PlayButton playing={this.props.playing || false} /></a>
        </Controls>
      </div>
    );
  }
}

export default connect(state => ({
  ...state.musicPlayer
}), {
  play,
  pause
})(styled(MusicBar)`
  box-sizing: border-box;
  height: 4.5em;
  width: 100%;
  background: ${props => props.theme.secondary};
  position: fixed;
  left: 0;
  bottom: 0;
`);