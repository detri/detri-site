import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './components/GlobalStyles.jsx';
import 'font-awesome-webpack!./assets/fonts/font-awesome.config.js';

import Layout from './Layout.jsx';

ReactDOM.render(
  <Router>
    <Layout />
  </Router>,
  document.getElementById('root'));
