const db = require('../../helpers/db_connection/db');

const { getUserData } = require('../login/login.data-access');

async function registerOauthUserIntoDatabase (username, email) {
    const trx = await db.transaction();
    try {
        const existingUser = await getUserData(email);

        if (existingUser.length > 0) {
            await trx.commit();
            return existingUser[0];
        } else {
                const user = await trx('users')
                .insert({
                    username: username,
                    email:email,
                    joined: new Date()
                })
                .returning('*');

            await trx.commit();
            return user[0];
        }
    } catch (error) {
        await trx.rollback();
        return error;
    }
}

module.exports = {
    registerOauthUserIntoDatabase,
}