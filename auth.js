const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = 'GOOGLE_CLIENT_ID';
const GOOGLE_CLIENT_SECRET = 'GOCSPX-GOOGLE_CLIENT_SECRET';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'google/callback',
    passReqToCallback: true,
},
    function (req, accessToken, refreshToken, profile, done) {
        // Save or use user info here
        return done(null, profile);
    }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));