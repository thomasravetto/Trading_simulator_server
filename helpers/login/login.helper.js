const bcrypt = require('bcryptjs');
const { findUserByEmail, getUserData } = require('../../app/login/login.data-access');

async function handleLogin (email, password) {
    try {
        const userData = await findUserByEmail(email);

        if (userData.length === 0) {
            throw new Error('Login Failed');
        };

        const isValid = await isPasswordValid(password, userData[0].hash);

        if (isValid) {
            const user = await getUserData(email);
            return user[0];
        } else {
            throw new Error('Login Failed');
        }
    } catch (error) {
        return error;
    }
}

async function isPasswordValid (password, hash) {
    return await bcrypt.compare(password, hash);
}

module.exports = {
    handleLogin,
}