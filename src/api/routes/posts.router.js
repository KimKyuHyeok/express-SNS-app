const express = require('express');
const {isAuth} = require("../middleware/auth");
const router = express.Router();
const {post} = require('../../model/posts.model');
const comments = require('../../model/comments.model');
const multer = require('multer');
const path = require('path');
const { friends, User } = require('../../model/users.model');
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

    friends.findAll({ where: { userId: req.user.id } })
        .then(result => {
            friendList = result;
            return post.findAll({
                include: [{ model: comments }, {model: User, attributes: ['username']}],
                order: [['createdAt', 'DESC']],
            });
        })
        .then(postList => {
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

module.exports = router