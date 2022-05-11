import express from 'express';
import bcrypt from 'bcrypt';




// model 
import User from '../models/users.js'


const router = express.Router();


router.get('/', async (req, res) => {
    try {



        res.status(201).json({ msg: 'hoho'})
        
    } catch(err) {
        console.error(err)
    }

})


router.post('/', async (req, res) => {
    try {
        const { id, password, email, name } = req.body;
        
        const user = await new User({ id, password, email, name })


        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                // if(err) throw new Error(err);
                user.password = hash
               
                user.save().then(user => {
                    res.status(201).json({ user })  
                })
                
            })
        })

        
       
        

        res.status(201).json({ user })
    } catch(err) {
        console.error(err)
    }
})





export default router;