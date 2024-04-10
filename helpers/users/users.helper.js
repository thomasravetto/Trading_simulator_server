const { getUserBalanceFromDatabase } = require('../../app/users/users.data-access');

async function getUserBalanceHelper (user_id) {
    try {
        const userBalance = await getUserBalanceFromDatabase(user_id);

        if (userBalance.length > 0) {
            return userBalance[0];
        } else {
            throw new Error(userBalance);
        }
    } catch (error) {
        return error;
    }
}

module.exports = {
    getUserBalanceHelper,
}