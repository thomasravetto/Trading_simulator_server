const { getUserBalanceHelper } = require('../../helpers/users/users.helper');

async function getUserBalance (req, res) {
    try {
        const { user_id } = req.body;

        const userBalance = await getUserBalanceHelper(user_id);

        if (userBalance) {
            return res.status(200).json(userBalance);
        } else {
            res.status(400).json({ error: 'Can\'t get user balance' });
        }
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = {
    getUserBalance
}