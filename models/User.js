const mongoose = requie('mongoose');


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

const User = mongoose.model('User', userSchema) // 모델로 생성

module.exports() = { User } // 다른 곳에서도 쓸 수 있도록
