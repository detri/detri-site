import React, { Fragment } from 'react';
import Navbar from './components/Navbar.jsx';
import RouteContainer from './RouteContainer.jsx';

const Layout = () => {
  return (
    <Fragment>
      <Navbar />
      <RouteContainer />
    </Fragment>
  );
};

export default Layout;
