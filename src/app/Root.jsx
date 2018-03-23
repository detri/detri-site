import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles.scss';


import Layout from './Layout.jsx';

ReactDOM.render(
  <Router>
    <Layout />
  </Router>,
  document.getElementById('root'));
