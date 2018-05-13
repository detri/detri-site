import React from 'react';
import Container from './Container.jsx';
import Title from './Title.jsx';
import ScrollBox from './ScrollBox.jsx';

const Songs = () => {
  return (
    <Container>
      <ScrollBox width="45%" margin="2.5%">
        <Title>new songs</Title>
      </ScrollBox>
    </Container>
  );
}

export default Songs;
