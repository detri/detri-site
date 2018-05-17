import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './ducks/index.js';
import ReactDOM from 'react-dom';
import DarkTheme from './components/DarkTheme.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import './components/GlobalStyles.jsx';

import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlayCircle from '@fortawesome/fontawesome-free-solid/faPlayCircle';

fontawesome.library.add(faPlayCircle);

import Layout from './Layout.jsx';

const store = configureStore();

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <DarkTheme>
        <Layout />
      </DarkTheme>
    </Provider>
  </Router>,
  document.getElementById('root'));
