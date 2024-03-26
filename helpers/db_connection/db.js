require('dotenv').config();

const db = require('knex')({
    client: 'pg',
    connection: {
        host : process.env.DB_HOST,
        port : process.env.DB_PORT,
        user : process.env.DB_USER,
        database : process.env.DB_DATABASE,
        password : process.env.DB_PASSWORD,
      // ssl: {
      //   rejectUnauthorized: false,
      // },
    }
});

// mock database to make tests
// database to be used in tests to not alter the real data

// const db = require('knex')({
//   client: 'pg',
//   connection: {
//     host: process.env.MOCK_HOST,
//     port : process.env.MOCK_PORT,
//     user : process.env.MOCK_USER,
//     database : process.env.MOCK_DATABASE,
//     password : process.env.MOCK_PASSWORD,
//   }
// });


module.exports = db;

/**
CREATE TABLE login (
ID serial PRIMARY KEY,
hash VARCHAR (100) NOT NULL,
email text UNIQUE NOT NULL
);

CREATE TABLE users (
ID serial PRIMARY KEY,
name VARCHAR(100),
email text UNIQUE NOT NULL,
joined TIMESTAMP NOT NULL
);

CREATE TABLE watchlist (
ID serial PRIMARY KEY,
asset_name VARCHAR NOT NULL,
asset_symbol VARCHAR(255) NOT NULL,
user_id INT NOT NULL
);
 */