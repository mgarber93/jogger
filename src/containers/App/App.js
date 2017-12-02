import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch'; 
import Home from '../Home/Home';
import Register from '../Register/Register';
import Login from '../Login/Login';
import New from '../New/New';
import Me from '../Me/Me';
import './App.css';

export default class extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/new" component={New} />
        <Route exact path="/me" component={Me} />
      </Switch>
    );
  }
}

