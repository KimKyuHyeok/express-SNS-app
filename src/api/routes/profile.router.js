const express = require('express');
const router = express.Router();
const { isAuth, checkIsMe } = require('../middleware/auth');
const post = require('../../model/posts.model');
const User = require('../../model/users.model');
const comments = require('../../model/comments.model');
const like = require('../../model/like.model');

router.get('/:id', isAuth, async (req, res) => {
    const user = await User.findOne({ where : { id: req.params.id }});
    post.findAll({
        where : { author : req.params.id },
        include: [
            { 
                model: comments, 
                include: [{ 
                    model: User, 
                    attributes: ['username']
                }] 
            }, 
            {
                model: User, 
                attributes: ['username']
            },
            {
                model: like,
                attributes: ['userId']
            }
        ],
        order: [['createdAt', 'DESC']],
    }).then((post) => {
        res.render('profile', {
            posts: post,
            user: user
        })
    }).catch((err) => {
        req.flash('error', '게시물을 가져오는데 실패했습니다.')
        res.redirect('back');
    });
})

router.get('/:id/edit', checkIsMe, (req, res) => {
    res.render('profile/edit', {
        user: req.user
    });
})

router.put('/:id', checkIsMe, (req, res) => {
    User.findOne({ where : { id: req.params.id }})
    .then((user) => {
        user.firstName = req.body.firstName,
        user.lastName = req.body.lastName,
        user.bio = req.body.bio,
        user.hometown = req.body.hometown,
        user.workplace = req.body.workplace,
        user.education = req.body.education,
        user.contact = req.body.contact
        
        try {
            user.save();
            req.flash('success', '회원정보가 성공적으로 변경되었습니다.')
            res.redirect('/profile/' + req.user.id);
        } catch (err) {
            req.flash('error', '회원정보가 수정 도중에 실패하였습니다.')
            res.redirect('/profile/' + req.user.id);
        }
    }).catch((err) => {
        req.flash('error', '회원정보 수정 실패');
        res.redirect('back');
    })
})

module.exports = router