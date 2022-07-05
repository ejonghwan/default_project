import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { auth } from '../middleware/auth.js' 

// model 
import User from '../models/users.js'

const router = express.Router();



//@ path    GET /api/users/load
//@ doc     로드 유저
//@ access  public
router.get('/load', auth, async (req, res) => {
    try {
        if(req.reftoken) {
            console.log('모두 만료돼서 디비 토큰 다시 저장하고 acc 다시 발급')
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.reftoken, salt, async(err, hash) => {
                    // res
                    await res.cookie('X-refresh-token', hash, { expires: new Date(Date.now() + 9000000), httpOnly: true });
                    await res.status(201).json(req.user)
                })
            })
        } else {
            console.log('디비 토큰 만료안돼서 이거넘김')
            res.status(201).json(req.user)
        }

    } catch(err) {
        console.error(err)
        res.status(400).json({ error: err.message })
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
        res.status(400).json({ error: err.message })
    }

})


//@ path    POST /api/users/login
//@ doc     로그인 
//@ access  public
router.post('/login', async (req, res) => {
    try {
        const { id, password } = req.body;

        if(!id ) return res.status(400).json({ err: 'is not id' }) 
        // if(!mongoose.isValidObjectId(_id)) return res.status(400).json({ err: 'is not id' }) 
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
                    bcrypt.hash(user.token, salt, async (err, hash) => {

                        // res
                        await res.cookie('X-refresh-token', hash, { expires: new Date(Date.now() + 9000000), httpOnly: true });
                        await res.status(201).json({
                            accToken,
                            _id: user._id,
                            id: user.id,
                            email: user.email,
                            name: user.name, 
                            createdAt: user.createdAt,
                            updatedAt: user.updatedAt,
                        });
                    })
                })
                

            });
        };


    } catch(err) {
        console.error(err)
        res.status(400).json({ err: err.message }) 
    }
})


//@ path    GET /api/users/logout
//@ doc     로그아웃
//@ access  public
router.get('/logout', auth, (req, res) => {
    res.status(201).clearCookie('X-refresh-token').json({message: "로그아웃 되었습니다"})
})


// 회원가입 질응답 안들어옴 확인 

//@ path    POST /api/users/
//@ doc     회원가입 
//@ access  public
router.post('/', async (req, res) => {
    try {
        const { id, password, email, name, qeustion, result } = req.body;
        if(!id || typeof id !== 'string') return res.status(400).json({ err: 'is not id' }) 
        if(!password ) return res.status(400).json({ err: 'is not password' }) 
        if(!email || typeof email !== 'string') return res.status(400).json({ err: 'is not email' }) 
        if(!name || typeof name !== 'string') return res.status(400).json({ err: 'is not name' }) 

        const user = await new User({ id, password, email, name, token: null, qeustion, result})

        console.log('si', user, qeustion, result)

        await bcrypt.genSalt(10, async (err, salt) => {

            // password hash
            await bcrypt.hash(user.password, salt, async (err, hash) => {
                if(err) throw new Error(err);
                user.password = hash;

                jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: "30 days" }, (err, reftoken) => {
                    user.token = reftoken
                    // save user
                    user.save().then(user => {
                        res.status(201).json({ 
                           
                            _id: user._id,
                            id: user.id,
                            email: user.email,
                            name: user.name, 
                            createdAt: user.createdAt,
                            updatedAt: user.updatedAt,
                        }) 
                    })
                });

            })
        })

        /* res data 
            {"user":{"id":"hoho123","email":"hoho123@naver.com","name":"hohoman","password":"$2b$10$tNvb0bavhmmegJwUxR.7COshNoGPXQwjOiHunhoQoCXFau9Z8n5Au","_id":"6290902af8a34b046421598d","createdAt":"2022-05-27T08:47:38.437Z","updatedAt":"2022-05-27T08:47:38.437Z","__v":0}}
        */
        
    } catch(err) {
        console.error(err)
        res.status(400).json({ err: err.message }) 
    }
})





router.post('/profile/edit', auth, async (req, res) => {
    try {

        const { id, _id, password, checkedPassword, name } = req.body;
        if(!id || typeof id !== 'string') return res.status(400).json({ err: 'is not id' }) 
        if(!mongoose.isValidObjectId(_id)) return res.status(400).json({ err: 'is not id' }) 
        if(!password) return res.status(400).json({ err: 'is not password' }) 
        if(!checkedPassword) return res.status(400).json({ err: 'is not checked password' }) 
        if(!name || typeof name !== 'string') return res.status(400).json({ err: 'is not name' }) 


        const userPassword = await User.findById(_id, 'password')
        const matched = await bcrypt.compare(password, userPassword)

        if(!matched) return res.status(400).json({ err: '' })
        if(!_id) return res.status(400).json({ err: 'is not user' })
        if(password !== checkedPassword) return res.status(400).json({ err: 'not password matched ' })

        if(password, checkedPassword) {
            
        }





    } catch(err) {
        console.error(err)
        res.status(400).json({ err: err.message })
    }
})



// jwt auth api users test
router.get('/test', async (req, res) => {
    try {
        // const findUser = await User.findOne({ _id: req.user._id })
        // res.status(200).json({ findUser })


        // console.log('cookies: ', req.cookies["X-refresh-token"])
        res.cookie('hoho', '123', {maxAge: 10000})
        // res.redirect('/');
        res.json({a: 1})

        // console.log('last line test api: ', req.user._id)
    } catch(err) {
        console.error(err)
    }
})


export default router;