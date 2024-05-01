const express = require('express');
const router = express.Router();
const comments = require('../../model/comments.model');

router.post('/:id/comments', (req, res) => {

    comments.create({
        description: req.body.description,
        userId: req.user.id,
        postId: req.params.id
    })
        .then(() => {
            req.flash('success', '댓글이 작성되었습니다.');
            return res.redirect('/posts');
        })
        .catch((err) => {
            console.err('Create Comments Error : ', err);
            req.flash('false', '댓글 생성에 실패하였습니다.');
            res.redirect('/posts');
        })
})

module.exports = router