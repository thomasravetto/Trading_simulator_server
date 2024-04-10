const express = require('express');

const usersRouter = express.Router();

const { getUserBalance } = require('./users.controller');

usersRouter.post('/get_balance', getUserBalance);

module.exports = usersRouter;