import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { auth } from '../middleware/auth.js' 


// model 
import User from '../models/users.js'


const router = express.Router();


//@ path    GET /api/users/
//@ doc     올 유저 
//@ access  public
router.get('/', async (req, res) => {
    try {
        const user = await User.find()
        res.status(201).json({ user })
    } catch(err) {
        console.error(err)
        res.status(400).json({ error: err.message })
    }

})


//@ path    POST /api/users/
//@ doc     회원가입 
//@ access  public
router.post('/', async (req, res) => {
    try {
        const { id, password, email, name } = req.body;
        if(!id || typeof id !== 'string') return res.status(400).json({ err: 'is not id' }) 
        if(!password || typeof password !== 'string') return res.status(400).json({ err: 'is not password' }) 
        if(!email || typeof email !== 'string') return res.status(400).json({ err: 'is not email' }) 
        if(!name || typeof name !== 'string') return res.status(400).json({ err: 'is not name' }) 

        const user = await new User({ id, password, email, name })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) throw new Error(err);
                // console.log('hash: ', hash)
                user.password = hash
               
                user.save().then(user => {
                    console.log('then user:', user)
                    res.status(201).json({ user })  
                })
                
            })
        })

        
    } catch(err) {
        console.error(err)
        res.status(400).json({ err: err.message }) 
    }
})




//@ path    POST /api/users/login
//@ doc     로그인 
//@ access  public
router.post('/login', async (req, res) => {
    try {
        const { _id, id, password } = req.body

        if(!id || typeof id !== 'string') return res.status(400).json({ err: 'is not id' }) 
        if(!_id || typeof _id !== 'string') return res.status(400).json({ err: 'is not id' }) 
        if(!password || typeof password !== 'string') return res.status(400).json({ err: 'is not password' }) 

        const user = await User.findOne({ id: id }) 
        if(!user) return res.status(400).json({ err: "is not find user" })
       
        
        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(400).json({ err: "password is not matched" })
        if(match) {
            jwt.sign({ _id: _id }, process.env.JWT_KEY, { expiresIn: "2 days" }, (err, token) => {
                if(err) throw new Error(err)
                // console.log('token???: ', token)
                res.status(201).json({
                    token,
                    _id: user._id, 
                    id: user.id,
                    email: user.email,
                    name: user.name,
                });
            });
        };

    } catch(err) {
        console.error(err)
        res.status(400).json({ err: err.message }) 
    }
})


router.post('/profile/edit', auth, async (req, res) => {
    try {
        const {  } = req.body;
    } catch(err) {
        console.error(err)
        res.status(400).json({ err: err.message })
    }
})



// jwt auth test
router.post('/test', auth, async (req, res) => {
    try {
        const findUser = await User.findOne({ _id: req.user._id })

        res.status(200).json({ findUser })
        
        console.log('last line test api: ', req.user._id)
    } catch(err) {
        console.error(err)
    }
})


export default router;