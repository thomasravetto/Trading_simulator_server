const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const app = require('../../helpers/express_server/app');

const { githubAuthHelper, githubCallbackHelper, githubLogoutHelper, githubFailureHelper } = require('../../helpers/oauth/oauth.github.helper');
const { registerOauthUserIntoDatabase } = require('./oauth.data-access');

const githubConfig = {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET
}

const GITHUB_AUTH_OPTIONS = {
    callbackURL: '/v1/auth/github/callback',
    clientID: githubConfig.GITHUB_CLIENT_ID,
    clientSecret: githubConfig.GITHUB_CLIENT_SECRET
}

async function verifyCallback (accessToken, refreshToken, profile, done) {
    const username = profile._json.login;
    const email = profile._json.email;

    const user = await registerOauthUserIntoDatabase(username, email);

    if (user && user.id) {
        done(null, user);
    } else {
        done(new Error("Error logging with Oauth"));
    }
}

passport.use(new GithubStrategy(GITHUB_AUTH_OPTIONS, verifyCallback));

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

function githubAuth (req, res) {
    githubAuthHelper(req, res, passport);
}

function githubCallback (req, res) {
    githubCallbackHelper(req, res, passport);
}

function githubLogout (req, res) {
    githubLogoutHelper(req, res, passport);
}

function githubFailure (req, res) {
    githubFailureHelper(req, res, passport);
}

module.exports = {
    githubAuth,
    githubCallback,
    githubLogout,
    githubFailure
}