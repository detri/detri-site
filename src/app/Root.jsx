import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Bulma from 'bulma';

import Layout from './Layout.jsx';

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Route path='/' component={Layout} />
  </Router>,
  document.getElementById('root'));
