import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import passport from 'passport';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { Strategy as LocalStrategy } from 'passport-local';
import mongoose from 'mongoose';
import { Provider } from 'react-redux';

import configureStore from './redux';
import App from './containers/App/App';
import api from './api/index';
import Account from './api/models/account';
import local from './api/routes/auth-local';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/Jogger', {
  useMongoClient: true
});

// passport config
passport.use(new LocalStrategy(Account.authenticate()));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

const server = express();
server
  .disable('x-powered-by')
  .use(logger('dev'))
  .use(cookieParser())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use('/api/', api)
  .use('/auth/local/', local)
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const context = {};
    let initState = {};
    if (req.isAuthenticated) {
      initState = {
        auth: {
          user: req.user
        }
      };
    }
    const store = configureStore(initState);
    const markup = renderToString(<Provider store={store} >
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    </Provider>);

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(renderFullPage(markup, initState));
    }
  });

const renderFullPage = (markup, preloadedState = {}) => `<!doctype html>
    <html lang="">
    <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Jogger</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
       <link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet">
        ${assets.client.css
    ? `<link rel="stylesheet" href="${assets.client.css}">`
    : ''}
        ${process.env.NODE_ENV === 'production'
    ? `<script src="${assets.client.js}" defer></script>`
    : `<script src="${assets.client.js}" defer crossorigin></script>`}
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
    </body>
</html>`;

export default server;
