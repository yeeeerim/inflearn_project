const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // salt가 몇 글자인지 설정
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 공백 제거해줌
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: { // token의 유효기간
        type: Number
    }
})

 // mongoose method
 // user 정보를 저장하기 전에 할 기능
 // {}의 내용을 수행한 후 next()으로 index.js의 user.save로 보냄
userSchema.pre('save', function(next) {
    var user = this;

    if(user.isModified('password')){ // password가 변화될 때만 비밀번호 암호화 실행
        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) { // hash: 암호화된 pw
                if(err) return next(err)

                user.password = hash; // password를 암호화된 password로 교체
                next()
            });
        });
    } else {
        next()
    }
})


userSchema.methods.comparePassword = function(plainPassword, cb) {

    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    })

}

userSchema.methods.generateToken = function(cb) {
    // jsonwebtoken을 이용해서 token 생성하기
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken') //user._id + 'secretToken' = token

    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

const User = mongoose.model('User', userSchema) // 모델로 생성

module.exports = { User } // 다른 곳에서도 쓸 수 있도록