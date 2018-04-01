import React from 'react';
import styled from 'styled-components';
import Container from './Container.jsx';

const StyledTitle = styled.h1`
  text-align: center;
  margin: 0;
  font-weight: bold;
`;

const Home = () => {
  return (
    <Container>
      <StyledTitle>
        What's up, nerd?
      </StyledTitle>
    </Container>
  );
};

export default Home;
