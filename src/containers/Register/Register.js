import React, { Component } from 'react';
import { connect } from 'react-redux';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { register } from '../../redux/modules/auth';
import Navbar from '../../components/Navbar/Navbar';


@connect(() => ({}), { register })
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
  }
  register(event) {
    event.preventDefault();
    this.props.register('register');
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <RegisterForm handleSubmit={this.register} />
        </div>
      </div>
    );
  }
}
