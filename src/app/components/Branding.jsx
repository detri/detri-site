import React from 'react';
import {
  NavbarBrand,
  NavbarItem
} from 'bloomer';

const Branding = ({ name }) => {
  return (<NavbarBrand>
    <NavbarItem>
      {name}
    </NavbarItem>
  </NavbarBrand>);
};

export default Branding;
