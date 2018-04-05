import React from 'react';
import styled from 'styled-components';
import { NavLink as RRLink } from 'react-router-dom';

const Link = styled(RRLink)`
  display: inline-block;
  box-sizing: border-box;
  line-height: 2.25em;
  height: 100%;
  width: 6.5em;
  text-align: center;
  padding: 0 0.5em 0 0.5em;
  text-decoration: none;
  font-weight: bold;
  color: inherit;
  letter-spacing: ${props => props.right ? '0.1em' : '0.25em'};
  transition: color 0.1s, background 0.3s, box-shadow 0.5s;

  &.active, &:hover {
    background: ${props => props.theme.primary};
    box-shadow: 0 0.225em 0px 0px ${props => props.theme.light};
  }

  float: ${props => props.right ? 'right' : 'none'};
`;

const NavLink = ({ to, exact, right, children }) => {
  return (<Link exact={exact} right={right} to={to} activeClassName='active'>
    {children}
  </Link>);
};

export default NavLink;
