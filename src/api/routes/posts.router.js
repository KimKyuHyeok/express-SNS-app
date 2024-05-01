const express = require('express');
const {isAuth, checkPostOwnerShip} = require("../middleware/auth");
const router = express.Router();
const post = require('../../model/posts.model');
const comments = require('../../model/comments.model');
const multer = require('multer');
const path = require('path');
const User = require('../../model/users.model');
const friends = require('../../model/friends.model');
const flash = require('connect-flash');

const storageEngine = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../../public/assets/images'));
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const upload = multer({storage: storageEngine}).single('image');


router.use(flash());


router.get('/', isAuth, (req, res) => {
    let friendList;
    console.log("TEST");
    post.findAll({
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
            }
        ],
        order: [['createdAt', 'DESC']],
    })
    .then(postList => {
        console.log("POST TEST >> " , postList)
        res.render('posts', {
            posts: postList,
            currentUser: req.user,
            currentFriends: friendList,
        });
    })
    .catch(err => {
        console.error("Error fetching data:", err);
        res.status(500).send('Server Error');
    });
    
});


router.post('/', isAuth, upload, (req, res) => {

    let desc = req.body.desc;
    let image = req.file ? req.file.filename : "";

    post.create({
        image: image,
        description: desc,
        author: req.user.id
    })
    .then(() => {
        req.flash('error', 'Post 작성 완료')
        res.redirect('back');
    })
    .catch((err) => {
        req.flash('success', 'Post 생성에 실패하였습니다.')
        res.redirect('back');
    });
})

router.get('/:id/edit', checkPostOwnerShip, (req, res) => {

    res.render('posts/edit', {
        post: req.post
    })
})
                   
router.put('/:id', checkPostOwnerShip, (req, res) => {
    post.findOne({ where : { id: req.params.id }})
        .then((post) => {
            post.description = req.body.description;

            return post.save();
        })
        .then((result) => {
            if (result) {
                req.flash('success', 'Post 수정 완료');
                res.redirect('/posts');
            }
        }).catch((err) => {
            console.log('Post 수정 에러', err);
            res.redirect('/posts');
        })
})

router.delete('/:id', checkPostOwnerShip, (req, res) => {
    console.log("DELETE START @@@@@@@@@@@@@@@@@@@@@@@");
    post.destroy({ where : { id: req.params.id }})
        .then(() => {
            req.flash('success', '게시물이 정상적으로 삭제되었습니다.');
            res.redirect('back');
        })
        .catch((err) => {
            console.err('post delete err : ', err);
            req.flash('false', '게시물 삭제 도중 에러가 발생하였습니다.');
            res.redirect('back');
        });
})

module.exports = router