import React from 'react';
import { Title, Icon, Columns, Column, Button } from 'bloomer';

const MadeBy = ({ children }) => {
  return (<React.Fragment>
    <Columns>
      <Column>
        <Title isSize={6}><em>Made by</em></Title>
        <p>Aaron Dosser</p>
        <p>adosser<Icon icon='fas fa-at' />ded.zone</p>
      </Column>
      <Column hasTextAlign='right'>
        <Title isSize={6}><em>Connect with me</em></Title>
        <Button isLink href='https://github.com/detri' isPulled='right' isSize='medium' style={{
          'width': '100px',
          'height': '35px'
        }}>
          <Icon icon='fab fa-github fa-2x' />
          &nbsp;&nbsp;
          <span>detri</span>
        </Button>
      </Column>
    </Columns>
  </React.Fragment>);
};

export default MadeBy;
