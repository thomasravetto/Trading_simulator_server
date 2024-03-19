const express = require('express');

const { handleRegister, validateEmail } = require('../../helpers/register/register.helper');

async function registerUser (req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.json({ error: 'Email or Password not provided' });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        const newUser = await handleRegister(username, email, password);

        if (newUser && newUser.email) {
            req.session.userid = newUser.id;
            req.session.username = newUser.username;
            req.session.email = newUser.email;

            return res.json(newUser);
        } else {
            res.status(400).json({ error: 'User already exists' });
        }
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = {
    registerUser
}