import React from 'react';
import Layout from './Layout.jsx';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

const DedzoneRouter = () => {
  return (<Router history={history}>
    <Layout />
  </Router>);
};

export default DedzoneRouter;
