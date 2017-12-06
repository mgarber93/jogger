import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import NavBar from '../../components/Navbar/Navbar';
import NewPasswordForm from '../../components/NewPasswordForm/NewPasswordForm';
import NewUsernameForm from '../../components/NewUsernameForm/NewUsernameForm';
import UserAdministration from '../../components/UserAdministration/UserAdministration';

@connect(({auth}) => ({user: auth.user}))
export default class Me extends Component {
  render() {
    const { user } = this.props;
    if (!user) {
      return (
        <Redirect to="/" />
      );
    }
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
          <hr />
          <UserAdministration />
        </div>
      </Fragment>
    );
  };
}
