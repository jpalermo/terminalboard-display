require('./env');
const {compact} = require('../helpers/application_helper');
const Application = require('../app/components/application');
const config = require('./config');
const {assetPath} = require('./asset_helper');
const express = require('express');
const Layout = require('../app/components/layout');
const path = require('path');
/* eslint-disable no-unused-vars */
const React = require('react');
/* eslint-enable no-unused-vars */

const ReactDOMServer = require('react-dom/server');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  const title = 'pui-react-starter';
  const scripts = compact([
    config.useHotModule && 'client.js',
    'application.js'
  ]).map(f => assetPath(f, config));
  const stylesheets = ['application.css'].map(f => assetPath(f, config));
  const html = ReactDOMServer.renderToString(<Layout {...{entry: Application, scripts, stylesheets, title}}/>);
  res.type('html').send(html);
});

module.exports = app;
