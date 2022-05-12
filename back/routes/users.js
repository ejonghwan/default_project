import express from 'express';
import bcrypt from 'bcrypt';




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
    }

})



//@ path    POST /api/users/
//@ doc     회원가입 
//@ access  public
router.post('/', async (req, res) => {
    try {
        const { id, password, email, name } = req.body;
        
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
    }
})





//@ path    POST /api/users/login
//@ doc     로그인 
//@ access  public
router.post('/login', async (req, res) => {
    try {

        const { id, password } = req.body
        const user = await User.findOne({ id: id }) 



        bcrypt.compare(user.password, password).then(result => {
            if(result) {
                console.log('true', result)
            } 
        })

    } catch(err) {
        console.error(err)
    }
})


export default router;