import React from 'react';
import Nav from './components/Nav.jsx';
import Home from './components/Home.jsx';
import { Route } from 'react-router-dom';
import DedzoneRouter from './DedzoneRouter.jsx';
import { hot } from 'react-hot-loader';

const Layout = () => {
  return (<div>
    <Nav />
    <Route path='/' component={Home} />
  </div>);
};

export default hot(module)(Layout);
