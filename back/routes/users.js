import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { auth } from '../middleware/auth.js' ;
import { mailAuth } from '../middleware/mailAuth.js' ;

// model 
import User from '../models/users.js';

const router = express.Router();



//@ path    GET /api/users/load
//@ doc     로드 유저
//@ access  public
router.get('/load', auth, async (req, res) => {
    try {
        if(req.reftoken) {
            console.log('모두 만료돼서 디비 토큰 다시 저장하고 acc 다시 발급')
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.reftoken, salt,(err, hash) => {
                    // res
                    delete req.user._doc.token;
                    res.cookie('X-refresh-token', hash, { expires: new Date(Date.now() + 7200000), httpOnly: true });
                    res.status(201).json(req.user)
                })
            })
        } else {
            console.log('디비 토큰 만료안돼서 이거넘김')
            res.status(201).json(req.user)
        }
            
    } catch(err) {
        console.error(err)
        res.status(500).json({ error: err.message })
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
        res.status(500).json({ error: err.message })
    }

})


//@ path    POST /api/users/login
//@ doc     로그인 
//@ access  public
router.post('/login', async (req, res) => {
    try {
        const { id, password } = req.body;

        if(!id ) return res.status(400).json({ err: 'is not id' }) 
        if(!password) return res.status(400).json({ err: 'is not password' }) 

        const user = await User.findOne({ id: id })
        if(!user) return res.status(400).json({ err: "is not find user" })

        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(400).json({ err: "password is not matched" })
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
                        res.status(201).json({ accToken, ...user._doc });
                    })
                })
            });
        };

    } catch(err) {
        console.error(err)
        res.status(500).json({ err: err.message }) 
    }
})


//@ path    GET /api/users/logout
//@ doc     로그아웃
//@ access  public
router.get('/logout', (req, res) => {
    res.status(201).clearCookie('X-refresh-token').json({message: "로그아웃 되었습니다"})
})



//@ path    POST /api/users/
//@ doc     회원가입 
//@ access  public
router.post('/', async (req, res) => {
    try {
        const { id, password, email, name, qeustion, phoneNumber, gender, birthday } = req.body;
        if(!id || typeof id !== 'string') return res.status(400).json({ err: 'is not id' }) 
        if(!password ) return res.status(400).json({ err: 'is not password' }) 
        if(!email || typeof email !== 'string') return res.status(400).json({ err: 'is not email' }) 
        if(!name || typeof name !== 'string') return res.status(400).json({ err: 'is not name' }) 
        if(!qeustion || typeof qeustion !== 'object') return res.status(400).json({ err: 'is not qeustion' }) 
        if(!phoneNumber || typeof phoneNumber !== 'string') return res.status(400).json({ err: 'is not phoneNumber' }) 
        if(!gender || typeof gender !== 'string') return res.status(400).json({ err: 'is not gender' }) 
        if(!birthday || typeof birthday !== 'string') return res.status(400).json({ err: 'is not birthday' }) 

        const user = await new User(req.body, { token: null })

        await bcrypt.genSalt(10, async (err, salt) => {
            // password hash
            await bcrypt.hash(user.password, salt, async (err, hash) => {
                if(err) throw new Error(err);
                user.password = hash;

                jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: "30 days" }, (err, reftoken) => {
                    user.token = reftoken
                    user.save().then(user => {
                        res.status(201).json({ 
                            message: '회원가입성공'
                        }) 
                    })
                });

            })
        })

    } catch(err) {
        console.error(err)
        res.status(500).json({ err: err.message }) 
    }
})


//@ path    PATCH /api/users/edit/name
//@ doc     이름 변경
//@ access  private
router.patch('/edit/name', auth, async(req, res) => {
    try {
        const { name, _id } = req.body;
        if(!name || typeof name !== 'string') return res.status(400).json({ err: 'is not name' }) 
        if(!mongoose.isValidObjectId(_id)) return res.status(400).json({ err: 'is not id' }) 

        const user = await User.findOneAndUpdate({ _id: _id }, { $set: {name: name} }, { new: true })
        res.status(201).json(user.name)

    } catch(err) {
        console.error(err)
        res.status(500).json({ err: err.message })
    }
})


//@ path    PATCH /api/users/edit/name
//@ doc     이메일 변경
//@ access  private
router.patch('/edit/email', auth, async(req, res) => {
    try {
        const { email, _id } = req.body;
        if(!email || typeof email !== 'string') return res.status(400).json({ err: 'is not email' }) 
        if(!mongoose.isValidObjectId(_id)) return res.status(400).json({ err: 'is not id' }) 

        const user = await User.findOneAndUpdate({ _id: _id }, { $set: {email: email} }, { new: true })
        res.status(201).json(user.email)

    } catch(err) {
        console.error(err)
        res.status(500).json({ err: err.message })
    }
})


//@ path    POST /api/users/edit/password
//@ doc     패스워드 변경
//@ access  private
router.post('/edit/password', auth, async (req, res) => {
    try {

        const { _id, prevPassword, newPassword, newPasswordCheck } = req.body;
        console.log('back body: ', req.body)
        if(!mongoose.isValidObjectId(_id)) return res.status(400).json({ err: 'is not _id' }) 
        if(!prevPassword && typeof prevPassword !== 'string') return res.status(400).json({ err: 'is not prev password' }) 
        if(!newPassword && typeof newPassword !== 'string') return res.status(400).json({ err: 'is not checked password' }) 
        if(newPassword !== newPasswordCheck) return res.status(400).json({ err: 'not password matched' })

        const user = await User.findById(_id)
        const matched = await bcrypt.compare(prevPassword, user.password)

        if(!user) return res.status(400).json({ err: 'is not user' })
        if(!matched) return res.status(400).json({ err: '이전 비번 확인해주세요' })

        if(matched) {
            console.log('back 비번 매칭성공')
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newPassword, salt, (err, hash) => {
                    console.log('back hashed', hash)
                    user.password = hash;
                    user.save();
                    res.status(200).json({ message: '비번 변경 성공!' })
                })
            })
        }
    } catch(err) {
        console.error(err)
        res.status(500).json({ err: err.message })
    }
})




export default router;