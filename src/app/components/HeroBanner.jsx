import React from 'react';
import {
  Hero,
  HeroBody,
  Container,
  Title,
  Subtitle
} from 'bloomer';

const HeroBanner = ({ isColor, title, subtitle }) => {
  return (
    <Hero isColor={isColor}>
      <HeroBody>
        <Container>
          <Title>{title}</Title>
          <Subtitle><em>{subtitle}</em></Subtitle>
        </Container>
      </HeroBody>
    </Hero>
  );
};

export default HeroBanner;
