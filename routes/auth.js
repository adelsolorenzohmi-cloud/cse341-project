const router = require('express').Router();
const passport = require('passport');

// Route to trigger GitHub login
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub callback route
router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/api-docs');
    }
);

// Logout route
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

// Login status check endpoint
router.get('/login-status', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ loggedIn: true, user: req.user });
    } else {
        res.status(401).json({ loggedIn: false, message: "Not logged in" });
    }
});

module.exports = router;