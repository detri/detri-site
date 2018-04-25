import React from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar.jsx';
import NavLink from './NavLink.jsx';

const Nav = ({ id, username }) => {
  return (
    <Navbar>
      <NavLink exact to='/'>MUSIC</NavLink>
      <NavLink to='/songs'>SONGS</NavLink>
      <NavLink to='/users'>USERS</NavLink>
      <NavLink right to={id ? '/users/' + id : '/register'}>{username || 'LOGIN'}</NavLink>
    </Navbar>
  );
};

export default connect(state => ({ ...state.currentUser }))(Nav);