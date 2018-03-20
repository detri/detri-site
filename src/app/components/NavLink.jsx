import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = ({ to, name }) => {
  return (<Link to={to} className='navbar-item'>
    {name}
  </Link>);
};

export default NavLink;
