var express = require('express');
var router = express.Router();
var User = require('../models/user');
var _ = require('underscore');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with user a resource');
});

//获取用户信息
router.get('/:id', function (req, res, next) {
    User.get(req.params.id, function (err, user) {
        if (err)
            return res.send({error: err});
        res.send(user);
    });
});

//获取用户列表
router.get('/list', function (req, res, next) {
    var options = {
        page  : 0,
        count : 10
    };
    User.list(options, function (err, users) {
        if (err)
            return res.send({error: err});
        User.count({}, function (err, total) {
            if (err)
                return res.send({error: err});
            res.send({
                rows      : users,
                pagination: {
                    count: parseInt(req.query.count),
                    page : parseInt(req.query.page),
                    pages: Math.round(total / req.query.count),
                    size : total
                }
            });
        });
    });
});

//登录
router.post('/authon', function (req, res, next) {
    var password = req.body.password;
    User.getByFilter({
        $and: [
            {$or: [{userName: req.body.userName}, {email: req.body.userName}]},
            {password: password}
        ]
    }, function (err, user) {
        if (err)
            return res.send({error: err});

        if (!user)
            return res.send({error: '账号或密码不正确'});

        if (!user.enabled)
            return res.send({error: '用户账号被禁用'});

        res.send({
            user: user
        });
    });
});

//增加或修改用户资料
router.post('/', function (req, res, next) {
    var id = req.body.user._id;
    var userObj = req.body.user;
    var _user;
    if (id) {
        User.findById(id, function (err, user) {
            if (err) {
                console.log(err);
            }
            _user = _.extend(user, userObj);
            _user.save(function (err, user) {
                if (err) {
                    console.log(err);
                }
                res.send({
                    success:true
                });
            })
        })
    } else {
        _user = new User({
            userName: userObj.userName,
            password: userObj.password,
            email   : userObj.email,
            enabled : true
        });
        _user.save(function (err, user) {
            if (err) {
                console.log(err);
            }
            res.send({
                success:true
            });
        });
    }
});



module.exports = router;
