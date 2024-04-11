function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login');
}

function isNotAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/posts');
    }
    return next();
}

module.exports = {
    isAuth,
    isNotAuth
}