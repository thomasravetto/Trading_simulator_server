const bcrypt = require('bcryptjs');

const { registerUserIntoDatabase } = require('../../app/register/register.data-access');

async function handleRegister (username, email, password) {
    try {
        const hash = await hashPassword(password);

        const newUser = await registerUserIntoDatabase(username, email, hash);

        console.log(newUser)

        if (newUser && newUser[0] && newUser[0].email) {
            return newUser[0];
        } else {
            throw new Error('Registration failed');
        }
    } catch (error) {
        return error;
    }
}

function validateEmail (email) {
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isEmailValid = emailPattern.test(email);

    return isEmailValid;
}

async function hashPassword (password) {
    return await bcrypt.hash(password, 10);
}

module.exports = {
    handleRegister,
    validateEmail
}