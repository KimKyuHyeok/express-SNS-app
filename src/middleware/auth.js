function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();

    }
    res.redirect('/user/login');
}

function isNotAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return next();
}

module.exports = {
    isAuth,
    isNotAuth
}