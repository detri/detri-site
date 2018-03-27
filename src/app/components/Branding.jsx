import React from 'react';
import {
  NavbarBrand,
  NavbarItem
} from 'bloomer';

const Branding = ({ name }) => {
  return (<NavbarBrand>
    <NavbarItem>
      <strong className='has-text-link'>music</strong>.{name}
    </NavbarItem>
  </NavbarBrand>);
};

export default Branding;
