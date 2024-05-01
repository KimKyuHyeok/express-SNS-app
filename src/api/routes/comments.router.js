const express = require('express');
const router = express.Router();
const comments = require('../../model/comments.model');
const {checkCommentOwnerShip} = require('../middleware/auth');

router.post('/:id/comments',checkCommentOwnerShip, (req, res) => {

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

router.delete('/:postId/comments/:id', (req, res) => {

    comments.destroy({ where : { postId: req.params.postId, id : req.params.id }})
        .then(() => {
            req.flash('success', '댓글이 정상적으로 삭제되었습니다.');
            return res.redirect('/posts');
        })
        .catch((err) => {
            console.err('Comments Delete Error : ', err);
            req.flash('error', '댓글 삭제에 실패하였습니다.');
            return res.redirect('/posts');
        })
})

module.exports = router