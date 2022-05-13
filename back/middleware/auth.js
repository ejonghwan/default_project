import jwt from 'jsonwebtoken';
import User from '../models/users.js'

// client 에서 넘어온 token값 보고 인증... 
export const auth = async (req, res, next) => {
    try {
        
        const token = req.header('x-access-token')
        const match = jwt.verify(token, process.env.JWT_KEY)
         //{ _id: '627c7b6cad3ac52d28a40418', iat: 1652419267 }


        if(!token) return res.status(400).json({ err: 'is not token' })
        if(!match) return res.status(400).json({ err: 'is not user' })
        if(match) {
            // console.log('auth in', match)
            req.user = match;
            next()
        } 
        

    } catch(err) {
        res.status(400).json({ err: 'is not user or token' })
        console.error(err)
    }
}


