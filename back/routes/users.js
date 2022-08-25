import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { auth } from '../middleware/auth.js' ;

// model 
import User from '../models/users.js';

const router = express.Router();



//@ path    GET /api/users/load
//@ doc     로드 유저
//@ access  public
router.get('/load', auth, async (req, res) => {
    try {
        delete req.user.token;
        if(req.reftoken) {
            console.log('모두 만료돼서 디비 토큰 다시 저장하고 acc 다시 발급')
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.reftoken, salt,(err, hash) => {
                    // res
                    res.cookie('X-refresh-token', hash, { expires: new Date(Date.now() + 7200000), httpOnly: true });
                    res.status(200).json(req.user)
                })
            })
        } else {
            console.log('디비 토큰 만료안돼서 이거넘김')
            res.status(200).json(req.user)
        }
            
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }

})



//@ path    GET /api/users/
//@ doc     올 유저 
//@ access  public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.find()
        res.status(201).json({ user })
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }

})


//@ path    POST /api/users/login
//@ doc     로그인 
//@ access  public
router.post('/login', async (req, res) => {
    try {
        const { id, password } = req.body;

        if(!id ) return res.status(400).json({ message: 'is not id' }) 
        if(!password) return res.status(400).json({ message: 'is not password' }) 

        const user = await User.findOne({ id: id })
        if(!user) return res.status(400).json({ message: "is not find user" })

        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(400).json({ message: "password is not matched" })
        if(match) {
            jwt.sign({ id: id }, process.env.JWT_KEY, { expiresIn: "2h" }, (err, accToken) => {
                if(err) throw new Error(err)

                // token hash
                bcrypt.genSalt(10, async (err, salt) => {
                    bcrypt.hash(user.token, salt, (err, hash) => {

                        delete user._doc.password;
                        delete user._doc.token;
                        delete user._doc.question;

                        res.cookie('X-refresh-token', hash, { expires: new Date(Date.now() + 7200000), httpOnly: true });
                        res.status(200).json({ accToken, ...user._doc });
                    })
                })
            });
        };

    } catch(err) {
        console.error(err)
        res.status(500).json({ message: err.message }) 
    }
})


//@ path    GET /api/users/logout
//@ doc     로그아웃
//@ access  public
router.get('/logout', (req, res) => {
    res.status(200).clearCookie('X-refresh-token').json({message: "로그아웃 되었습니다"})
})



//@ path    POST /api/users/signup
//@ doc     회원가입 
//@ access  public
router.post('/signup', async (req, res) => {
    try {
        const { id, password, email, name, qeustion, phoneNumber, gender, birthday } = req.body;
        if(!id || typeof id !== 'string') return res.status(400).json({ message: 'is not id' }) 
        if(!password ) return res.status(400).json({ message: 'is not password' }) 
        if(!email || typeof email !== 'string') return res.status(400).json({ message: 'is not email' }) 
        if(!name || typeof name !== 'string') return res.status(400).json({ message: 'is not name' }) 
        if(!qeustion || typeof qeustion !== 'object') return res.status(400).json({ message: 'is not qeustion' }) 
        if(!phoneNumber || typeof phoneNumber !== 'string') return res.status(400).json({ message: 'is not phoneNumber' }) 
        if(!gender || typeof gender !== 'string') return res.status(400).json({ message: 'is not gender' }) 
        if(!birthday || typeof birthday !== 'string') return res.status(400).json({ message: 'is not birthday' }) 

        const existingUser = await User.findOne({$or: [{id: id}, {phoneNumber: phoneNumber}] });
        if(existingUser) return res.status(400).json({ message: '유저가 이미 존재합니다' });
      
        const user = await new User(req.body, { token: null });

        await bcrypt.genSalt(10, async (err, salt) => {
            // password hash
            await bcrypt.hash(user.password, salt, async (err, hash) => {
                if(err) throw new Error(err);
                user.password = hash;

                jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: "30 days" }, (err, reftoken) => {
                    user.token = reftoken;
                    user.save().then(user => {
                        res.status(200).json({message: '회원가입 성공'});
                    });
                });
            });
        });

    } catch(err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
})


//@ path    PATCH /api/users/edit/userInfo
//@ doc     이름 변경
//@ access  private
router.patch('/edit/userInfo', auth, async(req, res) => {
    try {
        const { name, gender, birthday, phoneNumber, _id } = req.body;
        if(!name || typeof name !== 'string') return res.status(400).json({ message: '이름이 잘못되었습니다' }) 
        if(!gender || typeof gender !== 'string') return res.status(400).json({ message: '성별이 잘못되었습니다' }) 
        if(!birthday || typeof birthday !== 'string') return res.status(400).json({ message: '생일이 잘못되었습니다' }) 
        if(!phoneNumber || typeof phoneNumber !== 'string') return res.status(400).json({ message: '번호가 잘못되었습니다' }) 
        if(!mongoose.isValidObjectId(_id)) return res.status(400).json({ message: '_아이디가 잘못되었습니다' }) 


        // 한번 find하고 비교해서 바뀐거만 할지... 아니면 몇개안되니 find update 한번에 할지 ..고민
        // const newUserInfo = {}

        const user = await User.findOneAndUpdate({ _id: _id }, { $set: {name, gender, birthday, phoneNumber} }, { new: true })
        res.status(201).json(user)

    } catch(err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
})


//@ path    PATCH /api/users/edit/name
//@ doc     이메일 변경
//@ access  private
router.patch('/edit/email', auth, async(req, res) => {
    try {
        const getAuthCode = req.cookies["authCode"];
        const { email, _id, authNumber } = req.body;
        if(!email || typeof email !== 'string') return res.status(400).json({ message: 'is not email' });
        if(!mongoose.isValidObjectId(_id)) return res.status(400).json({ message: 'is not id' });
        if(!authNumber) return res.status(400).json({ message: 'is not authNumber' });

        // 3분토큰 만료인지 체크 
        if(!getAuthCode) return res.status(500).json({ message: '인증시간 만료. 다시 인증번호 발급받아주세요' });
    
        // 클라 번호와 메일 번호가 같은지 체크
        const match = await bcrypt.compare(authNumber, getAuthCode);
        // console.log('get cookie', getAuthCode, match)
        if(!match) return res.status(400).json({ message: '인증번호가 다릅니다'});


        const user = await User.findOneAndUpdate({ _id: _id }, { $set: {email: email} }, { new: true });
        if(!user) return  res.status(500).json({ message: '유저가 없습니다. 회원가입해주세요' });
      
        res.status(200).json({ message: '이메일이 정상적으로 변경되었습니다.', email: user.email });


    } catch(err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    };
});


//@ path    POST /api/users/edit/password
//@ doc     패스워드 변경
//@ access  private
router.post('/edit/password', auth, async (req, res) => {
    try {
        const { _id, prevPassword, newPassword, newPasswordCheck } = req.body;
        console.log('back body: ', req.body)
        if(!mongoose.isValidObjectId(_id)) return res.status(400).json({ message: 'is not _id' }) 
        if(!prevPassword && typeof prevPassword !== 'string') return res.status(400).json({ message: 'is not prev password' }) 
        if(!newPassword && typeof newPassword !== 'string') return res.status(400).json({ message: 'is not checked password' }) 
        if(newPassword !== newPasswordCheck) return res.status(400).json({ message: 'not password matched' })

        const user = await User.findById(_id)
        const matched = await bcrypt.compare(prevPassword, user.password)

        if(!user) return res.status(400).json({ message: 'is not user' })
        if(!matched) return res.status(400).json({ message: '이전 비번 확인해주세요' })

        if(matched) {
            console.log('back 비번 매칭성공')
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newPassword, salt, (err, hash) => {
                    console.log('back hashed', hash)
                    user.password = hash;
                    user.save();
                    res.status(201).json({ message: '비번 변경 성공!' })
                })
            })
        }
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
})


/* 인증로직 간단하게 
1. c: 인증번호 요청 
2. s: 메일로 인증번호 날림. 
      미들웨어에서 bcrypt로 암호화해서 req.body에 담아 넘김. 
      email router에서 jwt쿠폰으로 유효기간 설정 후 쿠키로 res 
3. c: 인증번호 입력 후 서버로 보낼 때 쿠키도 같이보냄 
4. s: c에서 넘어온 쿠키 유효기간 체크하고..지났으면 에러를 안지났으면 bcript로 비교 후 
*/

//@ path    POST /api/users/find/id
//@ doc     아이디 찾기
//@ access  public
router.post('/find/id', async (req, res) => {
    try {
        const getAuthCode = req.cookies["authCode"];
        const get_id = req.cookies["_id"];
        const { authNumber } = req.body;

        if(!mongoose.isValidObjectId(get_id)) return res.status(400).json({ message: 'id type check' });
        if(!authNumber) return res.status(400).json({ message: 'is not authNumber' });

        // 3분토큰 만료인지 체크 
        if(!getAuthCode) return res.status(500).json({ message: '인증시간 만료. 다시 인증번호 발급받아주세요' });
    
        // 클라 번호와 메일 번호가 같은지 체크
        const match = await bcrypt.compare(authNumber, getAuthCode);
        if(!match) return res.status(400).json({ message: '인증번호가 다릅니다'});

        const user = await User.findById(get_id)
        if(!user) return  res.status(500).json({ message: '유저가 없습니다. 회원가입해주세요' });

        res.status(200).json({message: `id는 ${user.id}입니다`, id: user.id})


    } catch(err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
})



export default router;