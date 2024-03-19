const db = require('../../helpers/db_connection/db');

const { findUserByEmail } = require('../login/login.data-access');

async function registerUserIntoDatabase (username, email, hash) {
    try {
        const userAlreadyExists = await findUserByEmail(email);

        if (userAlreadyExists.length > 0) {
            throw new Error('User already exists');
        }

        return db.transaction(async trx => {
            const registerEmail = await trx
                .insert({
                    email: email,
                    hash: hash
                })
                .into('login')
                .returning('email');

            const user = await trx('users')
                .returning('*')
                .insert({
                    username: username,
                    email: registerEmail[0].email,
                    joined: new Date()
                });

            return user;
        })
    } catch (error) {
        return error;
    }
}

module.exports = {
    registerUserIntoDatabase,
}