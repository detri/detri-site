import React from 'react';
import styled from 'styled-components';

class ProgressBar extends React.Component {
  render() {
    return (
      <div id="progress" className={this.props.className} style={{ width: `${this.props.width}%` }} />
    );
  }
}

export default styled(ProgressBar) `
  position: relative;
  top: -4.5em;
  height: 100%;
  vertical-align: top;
  background-color: ${props => props.theme.light};
  opacity: 0.05;
  transition: opacity 0.2s;
  z-index: 2;

  &:hover {
    opacity: 0.1;
    transition: opacity 0.2s;
  }
`;
