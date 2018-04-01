import React, { Fragment } from 'react';
import Nav from './components/Nav.jsx';
import MusicBar from './components/MusicBar.jsx';
import RouteContainer from './RouteContainer.jsx';

const Layout = () => {
  return (
    <Fragment>
      <Nav />
      <RouteContainer />
      <MusicBar />
    </Fragment>
  );
};

export default Layout;
