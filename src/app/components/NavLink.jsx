import React from 'react';
import styled from 'styled-components';
import { Link as RRLink } from 'react-router-dom';

const Link = styled(RRLink)`
  display: block;
  line-height: 2.25rem;
  height: 100%;
  width: 5em;
  text-align: center;
  padding: 0 0.5rem 0 0.5rem;
  text-decoration: none;
  font-weight: bold;
  color: inherit;
  letter-spacing: 0.25rem;
  transition: color 0.1s, background 0.3s;

  &:hover {
    background: #ee7272;
    color: #360000;
  }
`;

const NavLink = ({ to, children }) => {
  return (<Link to={to} className='navbar-item'>
    {children}
  </Link>);
};

export default NavLink;
