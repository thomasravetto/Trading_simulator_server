function githubAuthHelper (req, res, passport) {
    passport.authenticate('github', {
        scope: ['profile']
    })(req, res);
}

function githubCallbackHelper (req, res, passport) {
    passport.authenticate('github', {
        failureRedirect: '/auth/error',
        successRedirect: '/',
        session: true
    })(req, res, (err) => {
        if (err) {
            return res.redirect('/auth/error');
        }
    });
}

function githubLogoutHelper (req, res, next) {
    req.logout((err) => {
        if (err) {
        return next(err);
    }
    res.redirect('/auth/login');
    });
}

function githubFailureHelper (req, res, passport) {
    res.send('Failed to log in');
}

module.exports = {
    githubAuthHelper,
    githubCallbackHelper,
    githubLogoutHelper,
    githubFailureHelper
}