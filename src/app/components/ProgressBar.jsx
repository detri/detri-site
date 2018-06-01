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
  position: relative;
  top: -2.75em;
  left: 6em;
  height: 1em;
  width: 75%;
  background-color: #1A1A1A;
  z-index: 1;
  border-radius: 1em;
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

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { currentButton: 0, buttonWidth: 0 };

    this.setProgressRef = this.setProgressRef.bind(this);
    this.setButtonRef = this.setButtonRef.bind(this);
    setInterval(this.setCurrent.bind(this), 100);
  }

  setProgressRef(e) {
    this.progress = e;
    console.log(this.progress.clientWidth);
  }

  setButtonRef(e) {
    this.button = e;
    console.log(this.button.clientWidth);
  }

  setCurrent() {
    if (this.progress) {
      this.setState.bind(this)({ ...this.state, currentButton: this.progress.clientWidth });
    }
    if (this.button) {
      this.setState.bind(this)({ ...this.state, buttonWidth: this.button.clientWidth });
    }
  }

  render() {
    return (
      <React.Fragment>
        <ProgressContainer>
          <ProgressInner style={{ width: `${this.props.width}%` }} innerRef={this.setProgressRef} />
          <ProgressButton style={{ left: `${this.state.currentButton < this.state.buttonWidth ? '0' : this.state.currentButton - this.state.buttonWidth}px` }} innerRef={this.setButtonRef} />
        </ProgressContainer>
      </React.Fragment>
    );
  }
}

export default ProgressBar;