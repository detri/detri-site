import React from 'react';
import styled from 'styled-components';
import Container from './Container.jsx';

const StyledTitle = styled.h1`
  margin: 0;
  font-weight: bold;
`;

const Home = () => {
  return (
    <Container>
      <StyledTitle>
        ded.zone music
      </StyledTitle>
    </Container>
  );
};

export default Home;
