import React from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar.jsx';
import NavLink from './NavLink.jsx';

const Nav = ({ username, id }) => {
  if (username) {
    return (
      <Navbar>
        <NavLink exact to='/'>MUSIC</NavLink>
        <NavLink to='/songs'>SONGS</NavLink>
        <NavLink to='/users'>USERS</NavLink>
        <NavLink right to={'/users/id/' + id}>{username}</NavLink>
      </Navbar>
    );
  }
  return (
    <Navbar>
      <NavLink exact to='/'>MUSIC</NavLink>
      <NavLink to='/songs'>SONGS</NavLink>
      <NavLink to='/users'>USERS</NavLink>
      <NavLink right to='/register'>REGISTER</NavLink>
    </Navbar>
  );
};

export default connect(state => ({ ...state.userSession }))(Nav);
