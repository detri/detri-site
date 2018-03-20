import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Bulma from 'bulma';

import Layout from './Layout.jsx';

ReactDOM.render(
  <Router>
    <Layout />
  </Router>,
  document.getElementById('root'));
