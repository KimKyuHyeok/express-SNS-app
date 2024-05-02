const express = require('express');
const router = express.Router();
const like = require('../../model/like.model');

router.put('/:postId/like', (req, res) => {

    like.findOne({ where: { postId: req.params.postId, userId: req.user.id }})
        .then(async (likeResult) => {
            if(!likeResult) {
                await like.create({
                    postId: req.params.postId,
                    userId: req.user.id
                })
            } else {
                await like.destroy({ where : { postId: req.params.postId, userId: req.user.id }});
            }
            res.redirect('back');
        })
        .catch((err) => {
            console.log('Like Error : ', err);
            res.redirect('back');
        })
})

module.exports = router