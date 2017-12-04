import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/Navbar/Navbar';
import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className="Home" >
        <Helmet title="Home" />
        <Navbar id="navbar" />
        <header id="showcase">
          <div id="showtext"> 
            <h1>Jogger</h1>
            <p>
              An example app built on MERN 
            </p>
          </div>
        </header>
        <section id="section-a">
          <h1>Simple & Secure</h1>
          <p> Sessions for AUTH, JWT for REST </p>
        </section>
        <section id="section-b">
          <a href="/login" className="button">Login</a>
          <a href="/register" className="button">Register</a>
        </section>
        <section id="section-c">
          <div className="box-1">
            Mongo
          </div>
          <div className="box-2">
            Express
          </div>
          <div className="box-3">
            React
          </div>
          <div className="box-4">
            Node
          </div>
        </section>
      </div>
    );
  }
}
