const express = require('express');

const { githubAuth, githubCallback, githubLogout, githubFailure } = require('./oauth.github.controller');
const { googleAuth, googleCallback } = require('./oauth.google.controller');

const oauthRouter = express.Router();

oauthRouter.get('/github', githubAuth);
oauthRouter.get('/google', googleAuth);

oauthRouter.get('/github/callback', githubCallback);
oauthRouter.get('/google/callback', googleCallback);

oauthRouter.get('/logout', githubLogout);

oauthRouter.get('/auth/error', githubFailure);


module.exports = oauthRouter;