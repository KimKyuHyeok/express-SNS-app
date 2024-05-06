const comments = require('../../model/comments.model');
const post = require('../../model/posts.model');
const User = require('../../model/users.model');

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
        post.findOne({ where : { id: req.params.id }})
            .then((post) => {
                if (!post) {
                    req.flash('error', '포스트가 없거나 에러가 발생했습니다.')
                    res.redirect('back');
                } else {
                    if (post.author === req.user.id) {
                        req.post = post;
                        next();
                    } else {
                        req.flash('error', '권한이 없습니다.');
                        res.redirect('back');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
                    }   
                }   
           }).catch(() => {
                req.flash('error', '로그인을 해주세요.');
                res.redirect('/auth/login');
           })
        }
}

function checkCommentOwnerShip (req, res, next) {
    if (req.isAuthenticated()) {
        comments.findOne({ where : { postId: req.params.postId, id: req.params.id }})
            .then((comment) => {
                if (!comment) {
                    req.flash('error', '댓글이 없거나 에러가 발생했습니다.')
                    res.redirect('back');
                } else {
                    if (comment.userId === req.user.id) {
                        req.comment = comment;
                        next();
                    } else {
                        req.flash('error', '권한이 없습니다.');
                        res.redirect('back');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
                    }   
                }   
           }).catch(() => {
                req.flash('error', '로그인을 해주세요.');
                res.redirect('/auth/login');
           })
        }
}

function checkIsMe(req, res, next) {
    if (req.isAuthenticated()) {
        User.findOne({ where : { id: req.params.id }})
        .then((user) => {
            if(!user) {
                req.flash('error', '유저를 찾을 수 없거나 에러가 발생했습니다.');
                res.redirect('/profile/' + req.params.id);
            } else {
                if(user.id === req.user.id) {
                    next();
                } else {
                    req.flash('error', '권한이 없습니다.');
                    res.redirect('/profile/' + req.params.id);
                }
            }
        })
    } else {
        req.flash('error', '로그인을 먼저 해주세요.');
        res.redirect('/auth/login');
    }
}

module.exports = {
    checkCommentOwnerShip,
    checkPostOwnerShip,
    isAuth,
    isNotAuth,
    checkIsMe
}