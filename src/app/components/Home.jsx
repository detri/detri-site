import React from 'react';
import HeroBanner from './HeroBanner.jsx';

const Home = () => {
  return (
    <div>
      <HeroBanner
        title='Welcome to ded.zone!'
        isColor='success'
        subtitle='Music sharing done the right way.'
      />
    </div>
  );
};

export default Home;
