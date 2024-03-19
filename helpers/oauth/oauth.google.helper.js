function googleAuthHelper (req, res, passport) {
    passport.authenticate('google', {
        scope: ['email', 'profile']
    })(req, res);
}

function googleCallbackHelper (req, res, passport) {
    passport.authenticate('google', {
        failureRedirect: '/auth/error',
        successRedirect: '/',
        session: true
    })(req, res, (err) => {
        if (err) {
            console.log('error', err);
            return res.redirect('/auth/error');
        }
    });
}

module.exports = {
    googleAuthHelper,
    googleCallbackHelper,
}