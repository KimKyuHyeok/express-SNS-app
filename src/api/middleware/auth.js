const {post} = require('../../model/posts.model');

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

function checkPostOwnerShip (req, res, next) {
    if (req.isAuthenticated()) {
        post.findByPk(req.params.id, (err, post) => {
            if (err || !post) {
                req.flash('error', '포스트가 없거나 에러가 발생했습니다.')
                res.redirect('back');
            } else {
                if (post.author === req.user.id) {
                    next();
                } else {
                    req.flash('error', '권한이 없습니다.');
                    res.redirect                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                }
            }
        })


    } else {
        req.flash('error', '로그인을 해주세요.');
        res.redirect('/auth/login');
    }
}

module.exports = {
    isAuth,
    isNotAuth
}