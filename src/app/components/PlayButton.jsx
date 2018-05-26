import React from 'react';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const PlayButton = ({ playing, className }) => {
  return <FontAwesomeIcon className={className} icon={playing ? 'pause-circle' : 'play-circle'} size='4x' />;
};

export default styled(PlayButton)`
  position: relative;
  color: ${props => props.theme.light};
  padding: 5px;
  z-index: 3;
`;