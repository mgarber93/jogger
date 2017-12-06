import React, { Fragment } from 'react';

export default (props) => 
  <Fragment>
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
      <p>FullStack JavaScript, Sessions for AUTH</p>
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
  </Fragment>