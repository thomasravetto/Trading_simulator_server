const express = require('express');

const registerRouter = express.Router();

const { registerUser } = require('./register.controller');

registerRouter.post('/', registerUser);

module.exports = registerRouter;