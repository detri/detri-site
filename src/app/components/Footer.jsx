import React from 'react';
import {
  Footer as BFooter,
  Container,
  Columns,
  Column,
  Box,
  Title
} from 'bloomer';
import FooterColumn from './FooterColumn.jsx';

const Footer = () => {
  return (
    <BFooter>
      <Container>
        <Columns>
          <FooterColumn title='ded.zone™'>
            <p>2017-2018</p>
          </FooterColumn>
          <FooterColumn title='Powered by'>
            <Box>
              <a>NodeJS</a>
              <p>React</p>
              <p>Redux</p>
              <p>Bulma</p>
            </Box>
          </FooterColumn>
          <FooterColumn title='Made by'>
            <Box>
              <p>Aaron Dosser</p>
              <p>adosser＠kent.edu</p>
            </Box>
          </FooterColumn>
        </Columns>
      </Container>
    </BFooter>
  );
};

export default Footer;
