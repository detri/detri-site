import React from 'react';

import ModalContainer from './ModalContainer.jsx';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BGLink = styled(Link)`
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 3;
`;

const Register = () => {
  return (
    <React.Fragment>
      <BGLink to='/' id='modal' />
      <ModalContainer id='modalcontainer' />

    </React.Fragment>
  );
};

export default Register;
