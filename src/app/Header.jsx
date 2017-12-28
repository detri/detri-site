import React from 'react';

class Header extends React.Component {
  render () {
    return (
      <nav>
        <ul>
          <li className="logo">
            <a href="/">
              <strong>ded</strong>.zone
            </a>
          </li>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/music">Music</a>
          </li>
          <li>
            <a href="/users">Users</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;
