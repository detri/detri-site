import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarStart,
  NavbarEnd,
  NavbarMenu,
  Icon
} from 'bloomer';

const Nav = () => {
  return (
    <Navbar className='is-dark is-mobile'>
      <NavbarBrand>
        <NavbarItem>
          ded.zone
        </NavbarItem>
      </NavbarBrand>
      <NavbarMenu>
        <NavbarStart>
          <Link to='/' className='navbar-item'>
            Home
          </Link>
        </NavbarStart>
        <NavbarEnd>
        </NavbarEnd>
      </NavbarMenu>
    </Navbar>
  );
};

export default Nav;
