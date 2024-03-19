const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const helmet = require('helmet');
// Require more modules

const app = express();

const config = {
    COOKIE_KEY_1: process.env.COOKIE_KEY_1,
    COOKIE_KEY_2: process.env.COOKIE_KEY_2,
}

app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

app.use(express.json());
// Next line renders files in public folder, which contains the build from React
app.use(express.static(path.join(__dirname, '..',  '..', 'public')));


app.use(session({
    secret: config.COOKIE_KEY_1,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,  // Set back to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000,  // 24 hours in milliseconds
    },
}));

module.exports = app;