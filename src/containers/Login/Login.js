import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../../components/LoginForm/LoginForm';
import { login } from '../../redux/modules/auth';
import Navbar from '../../components/Navbar/Navbar';
import { Redirect } from 'react-router';

@connect(({ auth }) => ({ user: auth.user }), { login })
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin(event) {
    event.preventDefault();
    this.props.login('login');
  }
  render() {
    const { user } = this.props;
    if (user) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <div>
        <Navbar />
        <div className="container" >
          <LoginForm handleSubmit={this.handleLogin} />
        </div>
      </div>
    );
  }
}
