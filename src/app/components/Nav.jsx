import React from 'react';
import Navbar from './Navbar.jsx';
import NavLink from './NavLink.jsx';

const Nav = () => {
  return (
    <Navbar>
      <NavLink to='/songs'>SONGS</NavLink>
      <NavLink to='/users'>USERS</NavLink>
    </Navbar>
  );
};

export default Nav;
