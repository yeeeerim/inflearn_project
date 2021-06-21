const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {User} = require("./models/User");

const config = require('./config/key');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());
app.use(cookieParser())

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=>console.log('MongoDB Connected...')).catch(err => console.log(err))






app.get('/', (req,res) => res.send('Hello World!!~~~'))


app.post('/register', (req, res) => {
    // 회원가입 때 필요한 정보들을 client에서 가져오면
    // 그것들을 DB에 넣어준다.
    const user = new User(req.body)

    user.save((err, userInfo) => { // mongoDB method
        if(err) return res.json({success: false, err})
        return res.status(200).json({ //status(200):성공
            success: true
        })
    })
})

app.post('/login', (req, res) => {
    // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({email: req.body.email}, (err, user) => { //mongoDB method

            // 요청된 이메일이 데이터베이스에 있다면, 비밀번호가 맞는지 확인
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }


            // 비밀번호까지 맞다면, 토큰을 생성한다.
        user.comparePassword(req.body.password, (err,isMatch) => {
            if(!isMatch) return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."})

            user.generateToken((err, user) => { // 400:실패
               if(err) return res.status(400).send(err);

               // token을 (쿠키 or 로컬스토리지)에 저장
               res.cookie("x_auth", user.token)
               .status(200) // 200:성공
               .json({loginSuccess: true, userId: user._id})
            })

        })

    })

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))