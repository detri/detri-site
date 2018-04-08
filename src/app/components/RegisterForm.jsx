import React from 'react';
import { connect } from 'react-redux';
import {
  tryRegister,
  updateUsername,
  updatePassword,
  updateConfirmPassword,
  updateEmail,
  updateConfirmEmail
} from '../ducks/register.js';
import Input from './Input.jsx';
import FieldLabel from './FieldLabel.jsx';

class RegisterForm extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <FieldLabel>username</FieldLabel>
        <Input type='text' value={this.props.username} onChange={event => this.props.updateUsername(event.target.value)} />
        <FieldLabel>password</FieldLabel>
        <Input type='password' value={this.props.password} onChange={event => this.props.updatePassword(event.target.value)} />
        <FieldLabel>confirm password</FieldLabel>
        <Input type='password' value={this.props.confirmPassword} onChange={event => this.props.updateConfirmPassword(event.target.value)} />
        <FieldLabel>email</FieldLabel>
        <Input type='email' value={this.props.email} onChange={event => this.props.updateEmail(event.target.value)} />
        <FieldLabel>confirm email</FieldLabel>
        <Input type='email' value={this.props.confirmEmail} onChange={event => this.props.updateConfirmEmail(event.target.value)} />
      </React.Fragment>
    );
  }
};

export default connect(state => ({
  ...state.register
}), {
  tryRegister,
  updateUsername,
  updatePassword,
  updateConfirmPassword,
  updateEmail,
  updateConfirmEmail
})(RegisterForm);
