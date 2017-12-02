import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Navbar from '../../components/Navbar/Navbar';
import NewJogForm from '../../components/NewJogForm/NewJogForm';
import { newJog } from '../../redux/modules/app';

@connect(({ auth }) => ({ user: auth.user }), { newJog })
export default class Jogs extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.newJog();
  }
  render() {
    const { user } = this.props;
    return (
      <div className="Jogs">
        <Helmet title="New" />
        <Navbar />
        <div className="container">
          {user ?
            <div>
              <NewJogForm handleSubmit={this.handleSubmit} />
            </div>
            :
            <div>
              <Redirect to="/login" />
              <p>Log in to log a new jog</p>
            </div>
          }
        </div>
      </div>
    );
  }
}
