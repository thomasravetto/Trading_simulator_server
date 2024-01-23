const express = require('express');

// Import api router for every component
// EXAMPLE: const loginRouter = require('./login/login.api');

const api = express.Router();

// Use api router for every component
// EXAMPLE: api.use('/login', loginRouter);

module.exports = api;