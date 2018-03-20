import React from 'react';
import {
  Hero,
  HeroBody,
  Container,
  Title
} from 'bloomer';

const Users = () => {
  return (<Hero isColor='dark' isBold isSize='small'>
    <HeroBody>
      <Container hasTextAlign='centered'>
        <Title>Users</Title>
      </Container>
    </HeroBody>
  </Hero>);
};

export default Users;
