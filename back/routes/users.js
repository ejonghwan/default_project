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
    console.log('load??????')
    try {
        res.status(201).json(req.user)
        // console.log('users', req.user)

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
            jwt.sign({ id: id }, process.env.JWT_KEY, { expiresIn: "2s" }, (err, accToken) => {
                if(err) throw new Error(err)

                
                // token hash
                bcrypt.genSalt(10, async (err, salt) => {
                    bcrypt.hash(user.token, salt, async (err, hash) => {

                        // res
                        await res.cookie('X-refresh-token', hash, { expires: new Date(Date.now() + 9000000), httpOnly: true });
                        await res.cookie('hoho', '????')
                        console.log('cookie?')
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



//@ path    POST /api/users/
//@ doc     회원가입 
//@ access  public
router.post('/', async (req, res) => {
    try {
        const { id, password, email, name } = req.body;
        if(!id || typeof id !== 'string') return res.status(400).json({ err: 'is not id' }) 
        if(!password ) return res.status(400).json({ err: 'is not password' }) 
        if(!email || typeof email !== 'string') return res.status(400).json({ err: 'is not email' }) 
        if(!name || typeof name !== 'string') return res.status(400).json({ err: 'is not name' }) 

        const user = await new User({ id, password, email, name, token: null})

        await bcrypt.genSalt(10, async (err, salt) => {

            // password hash
            await bcrypt.hash(user.password, salt, async (err, hash) => {
                if(err) throw new Error(err);
                user.password = hash;

                 // refresh token hash
                jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: "1y" }, (err, token) => {
                    user.token = token

                    bcrypt.hash(token, salt, async (err, hash) => {
                        if(err) throw new Error(err);

                        // save user
                        user.save().then(user => {
                            // jwt access token create
                            jwt.sign({ id: id }, process.env.JWT_KEY, { expiresIn: "2s" }, (err, accToken) => {
                                if(err) throw new Error(err)
                                console.log('???????', user)
                                res.cookie('X-refresh-token', hash, { expires: new Date(Date.now() + 9000000), httpOnly: true });
                                res.cookie('test123', 'hoho123',{ expires: new Date(Date.now() + 9000000), httpOnly: true })
                                res.status(201).json({ 
                                    accToken,
                                    _id: user._id,
                                    id: user.id,
                                    email: user.email,
                                    name: user.name, 
                                    createdAt: user.createdAt,
                                    updatedAt: user.updatedAt,
                                }) 
                            });
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


        console.log('cookies: ', req.cookies["X-refresh-token"])
        res.cookie('hoho', '123', {maxAge: 10000})
        // res.redirect('/');
        res.json({a: 1})

        // console.log('last line test api: ', req.user._id)
    } catch(err) {
        console.error(err)
    }
})


export default router;