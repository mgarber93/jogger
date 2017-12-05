import React, { Component } from 'react';
import { reduxForm, Field, propTypes } from 'redux-form';
import Input from '../Input/Input';


@reduxForm({
  form: 'newPassword',
})
export default class NewPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locked: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  static propTypes = {
    ...propTypes
  };

  handleToggle() {
    this.setState({locked: !this.state.locked});
  }

  handleSubmit(data) {
    this.props.handleSubmit(data);
  }

  render() {
    const { handleSubmit, error } = this.props;

    if (this.state.locked) {
      return (
        <button className="btn btn-success" onClick={this.handleToggle}>CHANGE PASSWORD</button>
      )
    }

    return (
      <form className="form-horizontal" onSubmit={handleSubmit} >
        <Field name="username" type="password" component={Input} label="New Password" />
        {error && (
          <p className="text-danger">
            <strong>{error}</strong>
          </p>
        )}
        <button className="btn btn-cancel" onClick={this.handleToggle}>
          <i className="fa fa-trash" /> Cancel 
        </button>
        <button className="btn btn-success" type="submit">
          <i className="fa fa-sign-in" /> Submit 
        </button>
      </form>
    );
  }
}

