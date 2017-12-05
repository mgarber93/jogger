import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/Navbar/Navbar';
import Landing from './Landing';
import Jogs from '../Jogs/Jogs';
import './Home.css';

@connect(({auth}) => ({user:auth.user}))
export default class Home extends Component {
  render() {
    const {user} = this.props;
    return (
      <div className="Home" >
        <Helmet title="Home" />
        <Navbar id="navbar" />
        {user ? <Jogs /> : <Landing />}
      </div>
    );
  }
}
