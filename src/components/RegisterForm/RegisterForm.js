import React, { Component } from 'react';
import { reduxForm, Field, propTypes } from 'redux-form';
import registerValidation from './registerValidation';
import Input from '../Input/Input';


// validate: registerValidation
@reduxForm({
  form: 'register',
  validate: registerValidation
})
export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    ...propTypes
  };

  handleSubmit(data) {
    this.props.handleSubmit(data);
  }

  render() {
    const { handleSubmit, error } = this.props;

    return (
      <form className="form-horizontal" onSubmit={handleSubmit} >
        <Field name="email" type="text" component={Input} label="Email" />
        <Field name="username" type="text" component={Input} label="Username" />
        <Field name="password" type="password" component={Input} label="Password" />
        <Field name="password_confirmation" type="password" component={Input} label="Password confirmation" />
        {error && (
          <p className="text-danger">
            <strong>{error}</strong>
          </p>
        )}
        <button className="btn btn-success" type="submit">
          <i className="fa fa-sign-in" /> Register
        </button>
      </form>
    );
  }
}
