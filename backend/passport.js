
const passport = require('passport')
const googleStratgy = require('passport-google-oauth20').Strategy

passport.use(new googleStratgy({
    clientID: process.env.NODE_CLIENTID,
    clientSecret: process.env.NODE_CLIENTSECRET,
    callbackURL: "/api/auth/google/callback",
    scope: ["profile", "email"]
}, (accessToken, refreshToken, profile, callback) => {
    callback(null, profile)
}))

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});