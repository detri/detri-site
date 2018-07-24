import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Nav from './components/Nav/Nav.jsx';
import MusicBar from './components/MusicBar/MusicBar.jsx';
import RouteContainer from './RouteContainer.jsx';

const Layout = () => {
  return (
    <Fragment>
      <Route component={Nav} />
      <RouteContainer />
      <MusicBar />
    </Fragment>
  );
};

export default Layout;
