import React from 'react';
import styled from 'styled-components';

const SongTitle = styled.div`
  padding: 5px;
  display: inline-block;
`;

const SongBox = ({ song, className }) => {
  return (
    <div className={className}>
      <SongTitle><strong>{song.name}</strong></SongTitle>
    </div>
  );
};

export default styled(SongBox)`
  width: 100%;
  height: 4em;
  margin: 0.5em;
  text-shadow: 1px 1px 2px ${props => props.theme.primary};
  background-color: ${props => props.theme.secondary};
`;
