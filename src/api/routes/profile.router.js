const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleware/auth');
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

module.exports = router