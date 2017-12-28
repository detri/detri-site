import React from 'react';
import { createStore } from 'redux';
import * as mp from './redux/musicPage';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Header from './Header.jsx';
// import Home from './home.jsx';
import MusicPage from './MusicPage.jsx';
import Footer from './Footer.jsx';
import './style.css';

export const store = createStore(mp.default,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class Layout extends React.Component {
  render () {
    return (
      <div id='body'>
        <Header />
        <div className='container-fluid' id='main-content'>
          <div className='container'>
            <MusicPage />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.getElementById('root')
);
