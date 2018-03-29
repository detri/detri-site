import React from 'react';
import {
  Hero,
  HeroBody
} from 'bloomer';
import HeroBanner from './HeroBanner.jsx';
import UploadForm from './UploadForm.jsx';

const Upload = () => {
  return (
    <React.Fragment>
      <HeroBanner
        title='Upload a song'
        isColor='primary'
        subtitle='Pick an mp3 from your computer.'
      />
      <Hero isColor='dark' isBold>
        <HeroBody>
          <UploadForm />
        </HeroBody>
      </Hero>
    </React.Fragment>
  );
};

export default Upload;
