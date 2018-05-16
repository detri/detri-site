import React from 'react';
import styled from 'styled-components';
import { NavLink as RRLink } from 'react-router-dom';

const Link = styled(RRLink)`
  display: inline-block;
  box-sizing: border-box;
  line-height: 3em;
  vertical-align: text-bottom;
  height: 3em;
  width: 100%;
  text-align: right;
  padding: 0 0.5em 0 0.5em;
  text-decoration: none;
  font-weight: bold;
  color: inherit;
  letter-spacing: ${props => props.right ? '0.1em' : '0.25em'};
  transition: color 0.4s, background 0.4s;

  &.active, &:hover {
    color: ${props => props.theme.secondary};
    background-color: ${props => props.theme.light};
    transition: color 0.75s, background 0.6s;
  }
`;

const NavLink = ({ to, exact, children, right }) => {
  return (<Link exact={exact} to={to} activeClassName='active'>
      {children}
  </Link>);
};

export default NavLink;
