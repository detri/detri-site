import React from 'react';
import Nav from './components/Nav.jsx';
import RouteContainer from './RouteContainer.jsx';
import { hot } from 'react-hot-loader';

const Layout = () => {
  return (<div>
    <Nav />
    <RouteContainer />
  </div>);
};

export default hot(module)(Layout);
