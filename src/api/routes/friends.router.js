const express = require('express');
const router = express.Router();
const {isAuth} = require('../middleware/auth');
const User = require('../../model/users.model');
const friends = require('../../model/friends.model');
const flash = require('connect-flash');
const { Sequelize, Op } = require('sequelize');

router.use(flash());

router.get('/', isAuth, async (req, res) => {
    
    try {
        const userInfo = await User.findOne({
            where: { id: req.user.id },
            include: [{
                model: friends,
                where: {
                    [Op.or]: [
                        { friendId: req.user.id },
                        { userId: req.user.id }
                    ]
                },
                include: [{
                    model: User, // User 모델을 추가로 include
                    attributes: ['username'] // username 열을 가져옴
                }],
                attributes: ['id'] // friends 모델의 id 열만 가져옴
            }]
        })

        const users = await User.findAll({
            include: [{
                model: friends,
                attributes: ['id'],
                include: [{
                    model: User, // User 모델을 추가로 include
                    attributes: ['username'] // username 열을 가져옴
                }],
                required: false
            }]
        });

        console.log('TEST >' , userInfo.friends);

        res.render('friends', {
            currentUser: req.user,
            userInfo: userInfo,
            users: users
            });
    } catch (err) {
        console.error('Friends Get Error : ', err);
        res.redirect('back');
    }
})

router.put('/:friendId/accept-friend-request', async (req, res) => {
    friends.findOne({ where : {
        friendId: req.params.friendId,
        userId: req.user.id,
        status: 'pending'
    }})
    .then((friend) => {
        try {
            friend.status = 'accepted'
            friend.save();

            req.flash('success', '친구 요청 수락 완료')
            res.redirect('back')
        } catch (err) {
            console.error('친구 요청 수락 에러 : ', err)
            req.flash('error', '친구 요청 수락에 실패하였습니다.')
            res.redirect('back');
        }
    })
    .catch((err) => {
        console.error('친구 요청 없음 : ', err)
        req.flash('error', '친구 요청이 존재하지 않습니다.')
        res.redirect('back');
    })

})

router.put('/:friendId/rejected-friend-request', (req, res) => {
    friends.destroy({ where : {
        friendId: req.params.friendId,
        userId: req.user.id,
        status: 'pending'
    }}).then(() => {
        req.flash('success', '친구 요청을 거절하였습니다.')
        res.redirect('back')
    }).catch((err) => {
        console.error('친구 요청 거절 에러 : ', err)
        req.flash('error', '친구 요청 거절도중 에러 발생')
        res.redirect('back')
    })
})

router.put('/:userId/remove-friend-request/:friendId', (req, res) => {
    friends.destroy({ where : {
        friendId: req.params.friendId,
        userId: req.params.userId,
        status: 'pending'
    }}).then(() => {
        req.flash('success', '친구 요청이 취소되었습니다.')
        res.redirect('back')
    }).catch((err) => {
        console.error('친구 요청 취소 에러 : ', err)
        req.flash('error', '친구 요청 취소 실패')
        res.redirect('back')
    })
})

router.put('/:friendId/add-friend-request', (req, res) => {
    friends.create({
        friendId: req.user.id,
        userId: req.params.friendId,
        status: 'pending'
    }).then(() => {
        req.flash('success', '친구 요청이 완료되었습니다.')
        res.redirect('back')
    }).catch((err) => {
        console.error('친구 요청 에러 : ', err);
        req.flash('error', '친구 요청 도중에 에러가 발생했습니다.');
        res.redirect('back');
    })
})

router.put('/:id/remove-friend', (req, res) => {
    friends.destroy({ where : {
        id: req.params.id,
        userId: req.user.id,
        status: 'accepted'
    }}).then(() => {
        req.flash('success', '친구 목록에서 삭제되었습니다.')
        res.redirect('back')
    }).catch((err) => {
        console.error('친구 목록 삭제 에러 : ', err)
        req.flash('error', '친구 목록 삭제도중 에러가 발생하였습니다.')
        res.redirect('back')
    })
})

module.exports = router