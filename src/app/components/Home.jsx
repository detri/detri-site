import React from 'react';
import {
  Hero,
  HeroBody,
  Container,
  Title,
  Subtitle
} from 'bloomer';

const Home = () => {
  return (
    <Hero isColor='success' isBold isSize='small'>
      <HeroBody>
        <Container hasTextAlign='centered'>
          <Title>Welcome to ded.zone!</Title>
          <Subtitle><em>Music sharing done the right way</em></Subtitle>
        </Container>
      </HeroBody>
    </Hero>
  );
};

export default Home;
