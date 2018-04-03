import React from 'react';
import styled from 'styled-components';
import { Link as RRLink } from 'react-router-dom';

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
  letter-spacing: 0.25em;
  transition: color 0.1s, background 0.3s;

  &:hover {
    background: ${props => props.theme.primary};
  }
`;

const NavLink = ({ to, children }) => {
  return (<Link to={to}>
    {children}
  </Link>);
};

export default NavLink;
