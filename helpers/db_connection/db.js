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
    FOREIGN KEY (email) REFERENCES login(email),
    joined TIMESTAMP NOT NULL
);

CREATE TABLE watchlist (
    ID serial PRIMARY KEY,
    asset_name VARCHAR NOT NULL,
    asset_symbol VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    user_id INT,
    asset_symbol VARCHAR(10) NOT NULL,
    asset_name VARCHAR NOT NULL,
    transaction_type VARCHAR(10) NOT NULL CHECK (transaction_type IN ('buy', 'sell', 'short')),
    quantity DECIMAL(18, 2) NOT NULL,
    price DECIMAL(18, 2) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE portfolio (
    portfolio_id SERIAL PRIMARY KEY,
    user_id INT,
    asset_symbol VARCHAR(10) NOT NULL,
    asset_name VARCHAR NOT NULL,
    quantity DECIMAL(18, 2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
 */