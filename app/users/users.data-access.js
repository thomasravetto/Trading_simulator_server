const db = require('../../helpers/db_connection/db');

async function getUserBalanceFromDatabase (user_id) {
    try {
        const userBalance = await db('users').where({
            id: user_id
        }).select('balance');

        return userBalance;
    }
    catch (error) {
        return { error: error.message };
    }
}

module.exports = {
    getUserBalanceFromDatabase,
}