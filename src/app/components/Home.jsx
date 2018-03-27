import React from 'react';
import HeroBanner from './HeroBanner.jsx';

const Home = () => {
  return (
      <HeroBanner
        title='Welcome to ded.zone!'
        isColor='success'
        subtitle='Music sharing done the right way.'
      />
  );
};

export default Home;
