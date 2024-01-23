const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// Require more modules

const api = require('./app/api');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Next line renders files in public folder, which contains the build from React
// app.use(express.static(path.join(__dirname, '..', '..', 'public')));

app.use('/v1', api);

// Renders public files
// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })

module.exports = app;