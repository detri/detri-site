import React from 'react';
import styled from 'styled-components';

const ProgressOverlay = styled.div`
  position: relative;
  top: -2.75em;
  left: 6em;
  max-width: calc(100% - 14em);
  height: 1em;
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

const ProgressUnderlay = styled.div`
  position: relative;
  top: -4.75em;
  left: 6em;
  max-width: calc(100% - 14em);
  height: 1em;
  background-color: #1A1A1A;
  z-index: 1;
  border-radius: 1em;
`;

const ProgressButton = styled.div`
  position: relative;
  top: -3.75em;
  left: 6em;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: ${props => props.theme.primary};
  z-index: 3;
`;

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <React.Fragment>
        <ProgressOverlay id="progress" style={{ width: `${this.props.width}%` }} />
        <ProgressButton style={{ left: `calc(6em + calc(${(this.props.width / 100) * 932}px)` }} />
        <ProgressUnderlay />
      </React.Fragment>
    );
  }
}

export default ProgressBar;