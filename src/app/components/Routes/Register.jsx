import React from 'react';
import Container from '../Styling/Container.jsx';
import Title from '../Styling/Title.jsx';
import RegisterForm from '../Forms/RegisterForm.jsx';
import LoginForm from '../Forms/LoginForm.jsx';
import ScrollBox from '../Styling/ScrollBox.jsx';

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
