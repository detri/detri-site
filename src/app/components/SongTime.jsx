import React from 'react';
import styled from 'styled-components';

const SongTimeWrapper = styled.span`
  display: inline-block;
  font-size: 0.75em;
  font-family: 'Courier New';
  text-shadow: 1px 1px 2px ${props => props.theme.primary};
  color: ${props => props.theme.light};
  z-index: 2;
  margin-left: 1em;
  vertical-align: 2.75em;
`;

function secondsToMMSS(secs) {
  if (isNaN(secs)) {
    return '00:00';
  }
  const min = Math.floor(secs / 60);
  const sec = (secs % 60).toFixed(0);
  return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
}

const SongTime = ({ currentTime, duration }) => {
  return (
    <SongTimeWrapper>
      {`${secondsToMMSS(currentTime)}/${secondsToMMSS(duration)}`}
    </SongTimeWrapper>
  );
};

export default SongTime;
