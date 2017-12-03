import React from 'react';
import Nav from './nav.jsx';
import Home from './home.jsx';
import Footer from './footer.jsx';

class Layout extends React.Component {
  render() {
    return (
      <div id="body">
        <Nav />
        <div className="container-fluid" id="main-content">
          <div className="container">
            <Home />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Layout;
