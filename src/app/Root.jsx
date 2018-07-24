import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './ducks/index.js';
import ReactDOM from 'react-dom';
import DarkTheme from './components/Styling/DarkTheme.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import './components/Styling/GlobalStyles.jsx';

import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlayCircle from '@fortawesome/fontawesome-free-solid/faPlayCircle';
import faPauseCircle from '@fortawesome/fontawesome-free-solid/faPauseCircle';

fontawesome.library.add(faPlayCircle);
fontawesome.library.add(faPauseCircle);

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
