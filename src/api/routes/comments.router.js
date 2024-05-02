const express = require('express');
const router = express.Router();
const comments = require('../../model/comments.model');
const post = require('../../model/posts.model');
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

router.get("/:postId/comments/:id/edit", checkCommentOwnerShip, (req, res) => {
    post.findOne({ where : { id: req.params.postId }})
        .then((post) => {
            res.render('comments/edit', {
                post: post,
                comments: req.comment
            });
        })
        .catch((err) => {
            req.flash('error', '댓글에 해당하는 게시글이 없거나 에러가 발생했습니다.');
            res.redirect('back');
        })
})

router.put('/:postId/comments/:id', checkCommentOwnerShip, (req, res) => {



    comments.findOne({ where: { postId: req.params.postId, id: req.params.id } })
    .then((comment) => {
        if (comment) {
            comment.description = req.body.description;
            return comment.save();
        } else {
            console.error('Not Found Comment Error');
            req.flash('error', '존재하지 않는 댓글이거나 에러가 발생했습니다.');
            return res.redirect('back');
        }
    })
    .then(() => {
        req.flash('success', '댓글이 수정되었습니다.');
        return res.redirect('/posts');
    })
    .catch((err) => {
        console.error('Comments Put Error : ', err);
        req.flash('error', '댓글 수정에 실패하였습니다.');
        res.redirect('back');
    });

})

module.exports = router