import React from 'react';
import styled from 'styled-components';

const ProgressInner = styled.div`
  width: 0;
  height: 100%;
  background-color: ${props => props.theme.light};
  opacity: 0.05;
  transition: opacity 0.2s;
  z-index: 2;
  border-radius: 1em;

  &:hover {
    opacity: 0.1;
    transition: opacity 0.2s;
  }
`;

const ProgressContainer = styled.div`
  display: inline-block;
  top: -2.75em;
  margin-left: 1em;
  height: 1em;
  width: 66%;
  background-color: #1A1A1A;
  z-index: 1;
  border-radius: 1em;
  vertical-align: 0.5em;
  line-height: 0;
`;

const ProgressButton = styled.div`
  top: -1em;
  position: relative;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: ${props => props.theme.primary};
  z-index: 4;
`;

const CurSongText = styled.span`
  position: relative;
  font-size: 0.75em;
  color: ${props => props.theme.light};
  text-shadow: 1px 1px 2px ${props => props.theme.primary};
  z-index: 2;
  line-height: 0;
  vertical-align: top;
`;

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { currentButton: 0, buttonWidth: 0 };

    this.setProgressRef = this.setProgressRef.bind(this);
    this.setButtonRef = this.setButtonRef.bind(this);
    this.setContainerRef = this.setContainerRef.bind(this);
    this.seek = this.seek.bind(this);
    setInterval(this.setCurrent.bind(this), 100);
  }

  setContainerRef(e) {
    this.container = e;
  }

  setProgressRef(e) {
    this.progress = e;
  }

  setButtonRef(e) {
    this.button = e;
  }

  setCurrent() {
    if (this.progress) {
      this.setState.bind(this)({ ...this.state, currentButton: this.progress.clientWidth });
    }
    if (this.button) {
      this.setState.bind(this)({ ...this.state, buttonWidth: this.button.clientWidth });
    }
    if (this.container) {
      this.setState.bind(this)({ ...this.state, containerWidth: this.container.clientWidth });
    }
  }

  seek(e) {
    const { x } = e.target.getBoundingClientRect();
    const { clientWidth } = e.target;
    const { clientX } = e;
    const relPct = (clientX - x) / this.state.containerWidth;

    this.props.audioEl.currentTime = relPct * this.props.audioEl.duration;
  }

  render() {
    return (
      <React.Fragment>
        <ProgressContainer onClick={this.seek} innerRef={this.setContainerRef}>
          <ProgressInner style={{ width: `${this.props.width}%` }} innerRef={this.setProgressRef} onClick={() => { return; }} />
          <ProgressButton style={{ left: `${this.state.currentButton < this.state.buttonWidth ? '0' : this.state.currentButton - this.state.buttonWidth}px` }} innerRef={this.setButtonRef} />
          {this.props.curSong ?
            <CurSongText><strong>{this.props.curSong.User.username}</strong> - {this.props.curSong.name}</CurSongText>
          : <CurSongText>No song.</CurSongText>}
        </ProgressContainer>
      </React.Fragment>
    );
  }
}

export default ProgressBar;