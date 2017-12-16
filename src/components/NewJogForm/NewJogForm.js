import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import newJogValidation from './newJogValidation';
import DateTimePicker from '../DateTimePicker/DatetimePicker';
import SelectList from '../SelectList/SelectList';
import './NewJogForm.css';

const Input = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label htmlFor={input.name}>
      {label}
    </label>
    <div>
      <input {...input} type={type} className="form-control" />
      {error && touched && <span className="glyphicon glyphicon-remove form-control-feedback" />}
      {error &&
        touched && (
          <div className="text-danger">
            <strong>{error}</strong>
          </div>
        )}
    </div>
    <br />
  </div>
);

@reduxForm({
  form: 'NewJog',
  validate: newJogValidation,
})
export default class NewJog extends Component {
  static defaultProps = {}
  static propTypes = {}
  render() {
    const { handleSubmit, error } = this.props;
    return (
      <div className="Jogs">
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <div className="form-parent">
            <Field
              name="distance"
              type="text"
              component={Input}
              label="Distance"
              className="form-child"
            />
            <Field
              name="distanceFormat"
              component={SelectList}
              data={['mi', 'km']}
              label="Format"
            />
          </div>
          <br />
          <div>
            <Field name="time" type="text" component={Input} label="Time" />
            <Field
              name="timeFormat"
              component={SelectList}
              data={['min', 's']}
              label="Format"
            />
          </div>
          <br />
          <div>
            <label>Date (optional)
            </label>
            <Field
              name="date"
              showTime={false}
              component={DateTimePicker}
            />
          </div>
          {error && (
            <p className="text-danger">
              <strong>{error}</strong>
            </p>
          )}
          <br />
          <button className="btn btn-success" type="submit">
            <i className="fa fa-sign-in" /> Add
          </button>
        </form>
      </div>
    );
  }
}
