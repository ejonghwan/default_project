import jwt from 'jsonwebtoken';
import User from '../models/users.js'

// client 에서 넘어온 token값 보고 인증... 
export const auth = async (req, res, next) => {
    try {
        
        const token = req.header('X-access-token')
        const refreshToken = req.header('X-refresh-token')
        const match = jwt.verify(token, process.env.JWT_KEY)

         //{ _id: '627c7b6cad3ac52d28a40418', iat: 1652419267 }


        if(!token) return res.status(400).json({ err: 'is not access token' })
        if(!refreshToken) return res.status(400).json({ err: 'is not refresh token' })
        if(!match && refreshToken) {
            
            // access token이 동일하지않으면 refresh 토큰 요청
            req.refreshToken = refreshToken 
        }

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


