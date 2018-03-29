import React from 'react';
import {
  Container,
  Field,
  Label,
  Control,
  Input,
  Icon,
  Tile,
  Box,
  Notification,
  Subtitle
} from 'bloomer';

const UploadForm = () => {
  return (
    <Container>
      <Tile isAncestor>
        <Tile isParent isSize={3} />
        <Tile isParent isVertical isSize={6}>
          <Notification isColor='primary' className='tile is-child'>
            <Subtitle hasTextAlign='centered'>choose a tune</Subtitle>
          </Notification>
          <Box className='tile is-child'>
            <Field>
              <Label>Song title</Label>
              <Control hasIcons='left'>
                <Input type='text' placeholder='crash' />
                <Icon isAlign='left'>
                  <span className='fa fa-music' />
                </Icon>
              </Control>
            </Field>
          </Box>
        </Tile>
        <Tile isSize={3} />
      </Tile>
    </Container>
  );
};

export default UploadForm;
