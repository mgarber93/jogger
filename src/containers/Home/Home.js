import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/Navbar/Navbar';
import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Helmet title="Home" />
        <Navbar />
        <div className="container">
          <h1>Welcome to Jogger</h1>
        </div>
      </div>
    );
  }
}
