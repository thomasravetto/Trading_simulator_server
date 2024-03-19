const express = require('express');

const registerRouter = require('./register/register.api');
const loginRouter = require('./login/login.api');
const oauthRouter = require('./oauth/oauth.api');
const watchlistRouter = require('./watchlist/watchlist.api');
const marketRouter = require('./market/market.api');

const { sessionChecker } = require('../helpers/session/session_checker.helper');

const api = express.Router();

api.use('/register', registerRouter);
api.use('/login', loginRouter);
api.use('/auth', oauthRouter);
api.use('/watchlist', watchlistRouter);
api.use('/market', marketRouter);

api.use('/check_session', sessionChecker);

module.exports = api;