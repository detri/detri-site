import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const SongInfoText = styled.p`
  margin: 0;
`;

const SongInfo = styled.div`
  padding-top: 10px;
  font-size: 0.75em;
  display: inline-block;
  vertical-align: top;
`;

const PlayIcon = styled(FontAwesomeIcon)`
  padding: 10px;
  display: inline-block;
`;

const SongBox = ({ song, className }) => {
  return (
    <div className={className}>
      <PlayIcon icon="play-circle" size="3x" />
      <SongInfo>
        <SongInfoText><strong>{song.name}</strong></SongInfoText>
        <SongInfoText>Duration: {`${Math.floor(song.length / 60)}:${song.length % 60}`}</SongInfoText>
        <SongInfoText>Author: {song.User.username}</SongInfoText>
      </SongInfo>
    </div>
  );
};

export default styled(SongBox)`
  width: 100%;
  margin: 0.5em;
  text-shadow: 1px 1px 2px ${props => props.theme.primary};
  background-color: ${props => props.theme.secondary};
  border-radius: 5px;
`;
