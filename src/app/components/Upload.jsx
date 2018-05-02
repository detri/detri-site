import React from 'react';
import Container from './Container.jsx';
import Title from './Title.jsx';
import ScrollBox from './ScrollBox.jsx';
import UploadForm from './UploadForm.jsx';

const Upload = () => {
  return (
    <Container>
      <Title>upload a song!</Title>
      <ScrollBox>
        <UploadForm />
      </ScrollBox>
    </Container>
  );
};

export default Upload;
