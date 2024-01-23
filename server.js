// HTTP protocol will be initially used in this template.
// If HTTPS is wanted, comment next line and uncomment the next one.

const http = require('http');
// const https = require('https');
require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 3500;

// Options object to use inside the createServer function if using HTTPS instead of HTTP.
// const options = {
//     key: process.env.KEY_LOCATION,
//     cert: process.env.CERT_LOCATION
// }

const server = http.createServer(app);

function startServer () {
    server.listen(PORT, () => {
        console.log('Server listening on Port: ', PORT);
    })
}

startServer();