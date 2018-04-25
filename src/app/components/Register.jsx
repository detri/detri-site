import React from 'react';
import Container from './Container.jsx';
import Title from './Title.jsx';
import RegisterForm from './RegisterForm.jsx';
import LoginForm from './LoginForm.jsx';
import ScrollBox from './ScrollBox.jsx';

const Register = () => {
  return (
    <Container>
      <Title style={{float: 'left', display: 'inline'}}>create an account</Title>
      <Title style={{float: 'right', display: 'inline'}}>or login if you have one</Title>
      <ScrollBox>
        <RegisterForm />
        <LoginForm />
      </ScrollBox>
    </Container>
  );
};

export default Register;
