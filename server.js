const express = require('express');
const passport = require('passport');
const session = require('express-session');
require('./auth');
const app = express()

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('<a href ="/auth/google"> Authanticate your google account !</a>')
})
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
)
app.get('/google/callback',
    passport.authenticate('google',
        {
            failureRedirect: '/',
            successRedirect: '/profile'
        }),
)
app.get('/profile', isLoggedIn, (req, res) => {
    res.send('Welcome , ' + req.user.displayName + ' !')
})
app.get('/logout', (req, res, next) => {
    console.log('Attempting logout...');
    req.logout(function (err) {
        if (err) {
            console.error('Logout error:', err);
            return next(err);
        }
        req.session.destroy((err) => {
            if (err) {
                console.error('Session destroy error:', err);
                return next(err);
            }
            res.redirect('/');
        });
    });
});


app.listen(3000, () => {
    console.log('server is running on port 3000 ')
})