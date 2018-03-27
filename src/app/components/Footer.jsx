import React from 'react';
import {
  Footer as BFooter,
  Container,
  Columns,
  Column,
  Box,
  Title
} from 'bloomer';
import MadeBy from './MadeBy.jsx';

const Footer = () => {
  return (
    <BFooter>
      <Container>
        <Columns>
          <Column>
            <Title isSize={6}><em>ded.zone&trade; 2017-2018</em></Title>
          </Column>
          <Column>
            <Box style={{
              height: '100%'
            }}>
              <MadeBy />
            </Box>
          </Column>
          <Column>
            <Box style={{
              height: '100%'
            }}>
              <Title isSize={6}><em>Powered by</em></Title>
              <p>React</p>
              <p>Redux</p>
              <p>Bulma</p>
              <p>Bloomer</p>
            </Box>
          </Column>
        </Columns>
      </Container>
    </BFooter>
  );
};

export default Footer;
