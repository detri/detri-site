import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  tryLogin,
  updatePassword,
  updateUsername
} from '../ducks/login.js';
import Input from './Input.jsx';
import FieldLabel from './FieldLabel.jsx';
import SubmitButton from './SubmitButton.jsx';
import ScrollBox from './ScrollBox.jsx';

class LoginForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.render = this.render.bind(this);
  }

  handleSubmit() {
    this.props.tryLogin(this.props.username, this.props.password);
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
          <SubmitButton href='#' onClick={this.handleSubmit}>SUBMIT</SubmitButton>
          <br />
          {this.props.error}
        </div>
      );
    }
  }
}

const loginForm = styled(LoginForm) `
  position: relative;
  width: 33%;
  float: right;
`;

export default connect(state => ({
  ...state.login
}), {
    tryLogin,
    updatePassword,
    updateUsername
  })(loginForm);
