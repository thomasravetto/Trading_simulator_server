const https = require('https');
const fs = require('fs');
require('dotenv').config();

const appRouter = require('./appRouter');

const PORT = process.env.PORT || 3500;

const options = {
    key: fs.readFileSync(process.env.KEY_LOCATION),
    cert: fs.readFileSync(process.env.CERT_LOCATION)
}

const server = https.createServer(options, appRouter);

function startServer () {
    server.listen(PORT, () => {
        console.log('Server listening on Port: ', PORT);
    })
}

startServer();