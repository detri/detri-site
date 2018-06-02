import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  tryUpload,
  updateTitle,
  uploadFail,
  resetUpload
} from '../ducks/upload.js';
import Input from './Input.jsx';
import FieldLabel from './FieldLabel.jsx';
import SubmitButton from './SubmitButton.jsx';

class UploadForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.render = this.render.bind(this);
    this.fileInput = null;
  }

  validate() {
    const titleRegex = /^([\w\s]){1,80}$/;
    if (!titleRegex.test(this.props.title)) {
      return 'Title must be alphanumeric and 1-80 characters.';
    }
    if (!this.fileInput) {
      return 'You must select a file.';
    }
    return true;
  }

  handleSubmit() {
    const validationCheck = this.validate();
    if (!this.props.inProgress && validationCheck === true) {
      this.props.tryUpload(this.props.title, this.fileInput);
    } else {
      this.props.uploadFail(validationCheck);
    }
  }

  render() {
    if (this.props.success) {
      this.props.resetUpload();
      return <Redirect to='/' />;
    } else {
      return (
        <div className={this.props.className}>
          <FieldLabel>song name</FieldLabel>
          <Input type='text' value={this.props.title} onChange={event => this.props.updateTitle(event.target.value)} />
          <FieldLabel>pick a song</FieldLabel>
          <Input type='file' onChange={event => { this.fileInput = event.target.files[0]; }} />
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
    updateTitle,
    uploadFail,
    resetUpload
  })(UploadForm);
