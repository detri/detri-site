import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from './Input.jsx';
import FieldLabel from './FieldLabel.jsx';
import SubmitButton from './SubmitButton.jsx';

class UploadForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.render = this.render.bind(this);
  }

  validate() {
    const titleRegex = /^\w{1,80}$/;
    if (!titleRegex.test(this.props.title)) {
      return 'Title must be alphanumeric and 1-80 characters.';
    }
    return true;
  }

  render() {
    if (this.props.success) {
      return <Redirect to='/' />;
    } else {
      return (
        <div className={this.props.className}>
          <FieldLabel>song name</FieldLabel>
          <Input type='text' value={this.props.title} onChange={event => this.props.updateTitle(event.target.value)} />
          <SubmitButton href='#' onClick={this.handleSubmit}>SUBMIT</SubmitButton>
          <br />
          {this.props.error}
        </div>
      );
    }
  }
}

export default connect(state => ({
  ...state.upload
}), {
    tryUpload,
    updateTitle
  })(UploadForm);
