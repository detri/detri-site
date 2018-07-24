import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  tryRegister,
  registerFail,
  updateUsername,
  updatePassword,
  updateConfirmPassword,
  updateEmail,
  updateConfirmEmail
} from '../../ducks/register.js';
import Input from './Util/Input.jsx';
import FieldLabel from './Util/FieldLabel.jsx';
import SubmitButton from './Util/SubmitButton.jsx';

class RegisterForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.render = this.render.bind(this);
  }

  validate() {
    const pass = this.props.password;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passNumRegex = /(?=.*\d)/;
    const passAlphaRegex = /(?=.*[\w])/;
    const passRegex = /^[\w\d\W]{8,}$/;
    const userRegex = /^\w{4,}$/;
    const confirmPassword = this.props.password === this.props.confirmPassword;
    const confirmEmail = this.props.email === this.props.confirmEmail;
    if (!userRegex.test(String(this.props.username))) {
      return 'Username is not valid.';
    }
    if (!passRegex.test(pass)) {
      return 'Password must be alphanumeric and contain at least 8 characters.';
    }
    if (!passNumRegex.test(pass)) {
      return 'Password must contain at least one number.';
    }
    if (!passAlphaRegex.test(pass)) {
      return 'Password must contain at least one letter.';
    }
    if (!emailRegex.test(String(this.props.email))) {
      return 'Email is not valid.';
    }
    if (!confirmPassword) {
      return 'Passwords don\'t match.';
    }
    if (!confirmEmail) {
      return 'Emails don\'t match.';
    }
    return true;
  }

  handleSubmit() {
    if (!this.props.inProgress) {
      const validationCheck = this.validate();
      if (validationCheck === true) {
        this.props.tryRegister(this.props.username, this.props.password, this.props.email);
      } else {
        this.props.registerFail(validationCheck);
      }
    }
  }

  render() {
    if (this.props.success) {
      return <Redirect to='/' />;
    } else {
      return (
        <div className={this.props.className}>
          <FieldLabel>username</FieldLabel>
          <Input type='text' value={this.props.username} onChange={event => this.props.updateUsername(event.target.value)} />
          <FieldLabel>password</FieldLabel>
          <Input type='password' value={this.props.password} onChange={event => this.props.updatePassword(event.target.value)} />
          <FieldLabel>confirm password</FieldLabel>
          <Input type='password' value={this.props.confirmPassword} onChange={event => this.props.updateConfirmPassword(event.target.value)} />
          <h5>Password must be alphanumeric, contain more than 8 characters, and contain at least 1 number</h5>
          <FieldLabel>email</FieldLabel>
          <Input type='email' value={this.props.email} onChange={event => this.props.updateEmail(event.target.value)} />
          <FieldLabel>confirm email</FieldLabel>
          <Input type='email' value={this.props.confirmEmail} onChange={event => this.props.updateConfirmEmail(event.target.value)} />
          <SubmitButton href='#' onClick={this.handleSubmit}>SUBMIT</SubmitButton>
          <br />
          {this.props.error}
        </div>
      );
    }
  }
}

const registerForm = styled(RegisterForm) `
  position: relative;
  width: 33%;
  float: left;
`;

export default connect(state => ({
  ...state.register
}), {
    tryRegister,
    registerFail,
    updateUsername,
    updatePassword,
    updateConfirmPassword,
    updateEmail,
    updateConfirmEmail
  })(registerForm);
