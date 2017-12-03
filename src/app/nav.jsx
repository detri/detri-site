import React from 'react';
import NavItem from './navItem.jsx';

class Nav extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md bg-dark">
        <div className="container">
          <a className="navbar-brand text-light" href="/">
            ded.zone
                        </a>
          <ul className="navbar-nav">
            <NavItem name="Home" href="/" />
            <NavItem name="Music" href="/music" />
            <NavItem name="Users" href="/users" />
            <NavItem name="About" href="/about" />
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
