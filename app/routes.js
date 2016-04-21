var config = require('../config/settings')
var root = config.siteRoot;

module.exports = function(app, passport) {


    app.get(root + 'state', function(req, res) {
        res.set('Content-Type', 'application/javascript');
        res.send("window.appRoot = '" + root + "'; window.user = " + JSON.stringify(req.user || {}) + ";");
    });
    
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get(root, function(req, res) {
        res.render('index.ejs', model()); // load the index.ejs file
    });

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get(root + 'profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get(root + 'logout', function(req, res) {
        req.logout();
        res.redirect(root);
    });
    
    app.get(root + 'auth/oidc', passport.authenticate('oidc', { scope : 'email profile kcsara-profile' }));
    app.post(root + 'auth/callback', passport.authenticate('oidc', {successRedirect: root, failureRedirect: root }));
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect(root);
}

function model(model) {
    model = model || {};
    model.site = {debug: true, root: root };
    return model;
}