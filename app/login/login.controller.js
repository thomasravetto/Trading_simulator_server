const express = require('express');

const { handleLogin} = require('../../helpers/login/login.helper');
const { validateEmail } = require('../../helpers/register/register.helper');

async function loginUser (req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email or Password not provided' });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({error: 'The Email format is invalid'});
        }

        const user = await handleLogin(email, password);

        if (user && user.email) {
            req.session.userid = user.id;
            req.session.username = user.username;
            req.session.email = user.email;
            req.session.balance = user.balance;

            res.status(200).json(user);
        } else {
            return res.status(400).json({error: 'The Email Address or Password is invalid'})
        }
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = {
    loginUser
}