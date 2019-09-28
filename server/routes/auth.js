var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});

router.get('/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile']
    })
);

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {
        console.log(JSON.stringify(req.user, null, 2));
        req.session.token = req.user.token;
        res.redirect('/');
    }
);

module.exports = router;