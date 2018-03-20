import React from 'react';
import {
  Navbar,
  NavbarStart,
  NavbarEnd,
  NavbarMenu,
  Icon
} from 'bloomer';
import NavLink from './NavLink.jsx';
import Branding from './Branding.jsx';

const Nav = () => {
  return (<Navbar className='is-dark is-mobile'>
    <Branding name='ded.zone' />
    <NavbarMenu>
      <NavbarStart>
        <NavLink to='/' name='Home' />
        <NavLink to='/users' name='Users' />
        <NavLink to='/songs' name='Songs' />
      </NavbarStart>
      <NavbarEnd>
      </NavbarEnd>
    </NavbarMenu>
  </Navbar>);
};

export default Nav;