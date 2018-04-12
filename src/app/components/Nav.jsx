import React from 'react';
import Navbar from './Navbar.jsx';
import NavLink from './NavLink.jsx';
import UserLink from './UserLink.jsx';

const Nav = () => {
  return (
    <Navbar>
      <NavLink exact to='/'>MUSIC</NavLink>
      <NavLink to='/songs'>SONGS</NavLink>
      <NavLink to='/users'>USERS</NavLink>
      <UserLink>REGISTER</UserLink>
    </Navbar>
  );
};

export default Nav;
