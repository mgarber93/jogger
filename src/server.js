import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { Provider } from 'react-redux';
import session from 'express-session';
import { createClient as createRedisConnection } from 'redis';
import { ServerStyleSheet } from 'styled-components';
import compression from 'compression';
import { minify } from 'html-minifier';

import { passport } from './api/middleware/';
import configureStore from './redux';
import App from './containers/App/App';
import api from './api/index';
import { loginSuccess } from './redux/modules/auth';

const redisClient = createRedisConnection();
const RedisStore = require('connect-redis')(session);
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.RAZZLE_MONGO_URL, {
  useMongoClient: true
});


const server = express();
server
  .disable('x-powered-by')
	.use(compression())
  .use(logger('dev'))
  .use(cookieParser())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(session({
    store: new RedisStore({
      client: redisClient,
      host: 'localhost',
      port: 6379
    }),
    secret: process.env.RAZZLE_REDIS_SECRET || 'more laughter, more love, more life',
    resave: false,
    saveUninitialized: false
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use('/', api)
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const sheet = new ServerStyleSheet();

    const context = {};
    let initState = {};
    const store = configureStore(initState);

    if (req.isAuthenticated()) {
      store.dispatch(loginSuccess({data: {user: req.user}}));
    }

    const markup = renderToString(sheet.collectStyles(
      <Provider store={store} >
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </Provider>
    ));

    const styleTags = sheet.getStyleTags();

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        minify(
          renderFullPage(
            markup, 
            store.getState(), 
            styleTags
          ), 
          {
            collapseWhitespace: true, 
            minifyCSS: true, 
            minifyJS: true,
          }
        )
      );
    }
  });

const renderFullPage = (markup, preloadedState = {}, styling) => `<!doctype html>
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
    ${styling}
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
    </body>
</html>`;

export default server;
