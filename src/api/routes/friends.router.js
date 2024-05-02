const express = require('express');
const router = express.Router();
const {isAuth} = require('../middleware/auth');
const User = require('../../model/users.model');
const friends = require('../../model/friends.model');
const flash = require('connect-flash');

router.use(flash());

router.get('/', isAuth, async (req, res) => {
    
    try {
        const users = await User.findAll();

        const friendsRequest = await friends.findAll(
            { where : { 
                status: 'pending',
            },
            include: [{
                model: User,
                attributes: ['username']
            }]})

        const frineds = await friends.findAll(
            { where : { status: 'accepted' },
            include: [{
                model: User,
                attributes: ['username']
            }]});

        res.render('friends', {
            currentUser: req.user,
            friends: frineds,
            friendsRequest: friendsRequest,
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