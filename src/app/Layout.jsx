import React from 'react';
import Nav from './components/Nav.jsx';
import RouteContainer from './RouteContainer.jsx';
import Footer from './components/Footer.jsx';
import { hot } from 'react-hot-loader';

const Layout = () => {
  return (<div>
    <Nav />
    <RouteContainer />
    <Footer />
  </div>);
};

export default hot(module)(Layout);
