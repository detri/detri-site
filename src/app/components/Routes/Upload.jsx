import React from 'react';
import Container from '../Styling/Container.jsx';
import Title from '../Styling/Title.jsx';
import ScrollBox from '../Styling/ScrollBox.jsx';
import UploadForm from '../Forms/UploadForm.jsx';

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
