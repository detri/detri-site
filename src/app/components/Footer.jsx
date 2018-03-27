import React from 'react';
import {
  Footer as BFooter,
  Container,
  Columns,
  Column,
  Box,
  Title,
  Icon,
  Level,
  LevelItem,
  LevelLeft,
  LevelRight
} from 'bloomer';

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
              <Title isSize={6}><em>Made by</em></Title>
              <p>Aaron Dosser</p>
              <p>adosser＠ded.zone</p>
              <Level>
                <LevelLeft>
                  <LevelItem>
                    <Icon icon='fab fa-github-square fa-2x' isDisplay='inline' />
                  </LevelItem>
                  <LevelItem>
                    github.com/detri
                  </LevelItem>
                </LevelLeft>
              </Level>
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
