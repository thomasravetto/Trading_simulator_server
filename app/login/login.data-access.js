const db = require('../../helpers/db_connection/db');

async function findUserByEmail (email) {
    try {
        const user = await db('login').where({
            email: email
        }).select('*');

        return user;
    }
    catch (error) {
        return { error: error.message };
    }
}

async function getUserData (email) {
    try {
        const user = await db('users').where({
            email: email
        }).select('*');

        return user;
    }
    catch (error) {
        return { error: error.message };
    }
}

module.exports = {
    findUserByEmail,
    getUserData,
}