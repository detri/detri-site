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

const SongBox = ({ song, className, playing }) => {
  const min = Math.floor(song.length / 60);
  const sec = song.length % 60;
  const date = new Date(song.created_at);
  let dateHour = date.getHours();
  let dd = 'AM';
  if (dateHour >= 12) {
    dateHour -= 12;
    dd = 'PM';
  }
  const dateMin = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  return (
    <div className={className}>
      <PlayIcon icon={playing ? 'pause-circle' : 'play-circle'} size="3x" />
      <SongInfo>
        <SongInfoText><strong>{song.name}</strong></SongInfoText>
        <SongInfoText>Duration: {`${min}:${sec < 10 ? '0' + sec : sec}`}</SongInfoText>
        <SongInfoText>Uploaded: {`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${dateHour}:${dateMin} ${dd}`}</SongInfoText>
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
