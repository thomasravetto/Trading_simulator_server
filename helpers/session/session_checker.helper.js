function sessionChecker (req, res) {
    if ((req.session) && (req.session.userid && req.session.username && req.session.email) || (req.session.passport) && (req.session.passport && req.session.passport.user)) {

        const id = req.session.userid || req.session.passport.user.userid;
        const username = req.session.username || req.session.passport.user.username;
        const email = req.session.email || req.session.passport.user.email;

        res.json({ isAuthenticated: true, id:id, username: username, email: email });
    } else {
        res.json({ isAuthenticated: false });
    }
}

module.exports = { sessionChecker };

/**
 if ((req.session) && (req.session.userid && req.session.username && req.session.email) || (req.session.passport) && (req.session.passport && req.session.passport.user)) {

        const id = req.session.userid || req.session.passport.user.userid;
        const username = req.session.username || req.session.passport.user.username;
        const email = req.session.email || req.session.passport.user.email;

        res.json({ isAuthenticated: true, id:id, username: username, email: email });
    } else {
        res.json({ isAuthenticated: false });
    }
 */