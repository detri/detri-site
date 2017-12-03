import React from 'react';

class Footer extends React.Component {
  render () {
    return (
      <footer className='footer text-light bg-dark'>
        <div className='container' id='footercontainer'>
          <center>
            <div className='text-muted'>
              <span>ded.zone 2017 |</span>
              <a href='https://twitter.com/Junkie5XL'> Twitter</a>
              <span> |</span>
              <a href='https://steamcommunity.com/id/detriment'> Steam</a>
            </div>
          </center>
        </div>
      </footer>
    );
  }
}

export default Footer;
