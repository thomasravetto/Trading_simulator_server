const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = require('../../helpers/express_server/app');

const { registerOauthUserIntoDatabase } = require('./oauth.data-access');
const { googleAuthHelper, googleCallbackHelper } = require('../../helpers/oauth/oauth.google.helper');
const { githubLogoutHelper, githubFailureHelper } = require('../../helpers/oauth/oauth.github.helper');

const googleConfig = {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
}

const GOOGLE_AUTH_OPTIONS = {
    callbackURL: '/v1/auth/google/callback',
    clientID: googleConfig.GOOGLE_CLIENT_ID,
    clientSecret: googleConfig.GOOGLE_CLIENT_SECRET
}

async function verifyCallback (accessToken, refreshToken, profile, done) {
    const username = profile._json.login || profile._json.name;
    const email = profile._json.email;

    const user = await registerOauthUserIntoDatabase(username, email);

    if (user && user.id) {
        done(null, user);
    } else {
        done(new Error("Error logging with Oauth"));
    }
}

passport.use(new GoogleStrategy(GOOGLE_AUTH_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => {
    const userid = user.id;
    const username = user.username;
    const email = user.email;

    done(null, { userid: userid, username: username, email: email });
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

function googleAuth (req, res) {
    googleAuthHelper(req, res, passport);
}

function googleCallback (req, res) {
    googleCallbackHelper(req, res, passport);
}

function googleLogout (req, res) {
    // function imported from github file
    githubLogoutHelper(req, res, passport);
}

function googleFailure (req, res) {
    // function imported from github file
    githubFailureHelper(req, res, passport);
}

module.exports = {
    googleAuth,
    googleCallback,
    googleLogout,
    googleFailure
}