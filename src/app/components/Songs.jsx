import React from 'react';
import HeroBanner from './HeroBanner.jsx';
import { Hero } from 'bloomer/lib/layout/Hero/Hero';

const Songs = () => {
  return (
    <div>
      <HeroBanner
        title='Songs'
        isColor='info'
        subtitle='Pick your poison.'
      />
    </div>
  );
};

export default Songs;
