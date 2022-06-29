import jwt from 'jsonwebtoken';
import User from '../models/users.js'
import bcrypt from 'bcrypt'



// client 에서 넘어온 token값 보고 인증... 
export const auth = async (req, res, next) => {
        const accToken = req.header('X-access-token')
        if(!accToken) return res.status(400).json({ err: 'is not access token' })

        console.log(accToken)
        const match = jwt.verify(accToken, process.env.JWT_KEY, /*{ignoreExpiration: true},*/) 
         
        // decode가 있으면 acc로 인증 
        if(match) { 
            const user = await User.findOne({ id: match.id })
            req.user = {
                accToken,
                _id: user._id,
                id: user.id,
                email: user.email,
                name: user.name, 
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }
            next() 
        }

        // 없으면 refresh 
        if(!match) {
            console.log('acc 토큰 만료돼서 refresh 토큰 으로 인증하고 다시 발급')
            const getRefreshToken = req.header('X-refresh-token')
            const refreshTokenDecode = decodeURIComponent(getRefreshToken)
            const user = await User.findOne({ _id: req.query._id })

            if(!getRefreshToken) return res.status(400).json({ err: 'is not refresh token' })
            
            // user.token값 만료됐으면 다시 발급 절차 넣어야함
            // const match = await jwt.verify(refreshTokenMatch, process.env.JWT_KEY)

            const refreshTokenMatch = await bcrypt.compare(user.token, refreshTokenDecode)
            
            console.log('re??', refreshTokenMatch)

            
            if(refreshTokenMatch) {
                const acctoken = await jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: "1s" })
                req.user = {
                    accToken,
                    _id: user._id,
                    id: user.id,
                    email: user.email,
                    name: user.name, 
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                }
                next() 
            }
        }
        // refresh token

}


