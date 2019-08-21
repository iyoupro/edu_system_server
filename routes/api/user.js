// @login & register
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../../config/key');
const User = require('../../models/user');
const passport = require('passport');

router.get('/test', (req, res) => {
    res.json({
        msg:'login'
    })
});

router.post('/login', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    User.findOne({name})
        .then(user => {
            if(!user){
                return res.status(404).json({msg:"用户不存在!"});
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        const rule = {id:user.id, name: user.name};
                        jwt.sign( rule, keys.secretOrKey, {expiresIn: 100}, (err, token) => {
                            if(err) throw err;
                            res.json({
                                success: true,
                                msg: '登录成功',
                                token:"Bearer " + token
                            });
                        } )
                    }
                    else{
                        return res.status(400).json({msg:'密码错误!'});
                    }
                })
        })
});

router.post('/register', (req, res) => {
    User.findOne({email:req.body.email})
        .then((user) => {
            if(user){
                return res.status(400).json({msg:'邮箱已被注册!'})
            }else{
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                bcrypt.genSalt(10, function(err, salt){
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
});

router.get('/current', passport.authenticate('jwt', {session: false}),(req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
})

module.exports = router;