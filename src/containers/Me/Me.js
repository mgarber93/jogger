import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../../components/Navbar/Navbar';
import NewPasswordForm from '../../components/NewPasswordForm/NewPasswordForm';
import NewUsernameForm from '../../components/NewUsernameForm/NewUsernameForm';

@connect(({auth}) => ({user: auth.user}))
export default class Me extends Component {
  render() {
    const { user } = this.props;
    return (
      <Fragment>
        <NavBar />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h2 style={{ float: 'center', margin: 'auto' }}> {user.username.toUpperCase()}'S ACCOUNT </h2>
        </div>
        <div className="container">
          <hr />
          <NewUsernameForm />
          <hr />
          <NewPasswordForm />
        </div>
      </Fragment>
    );
  };
}
