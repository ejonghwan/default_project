import jwt from 'jsonwebtoken';
import User from '../models/users.js'
import bcrypt from 'bcrypt'



// client 에서 넘어온 token값 보고 인증... 
export const auth = async (req, res, next) => {
        const accToken = req.header('X-access-token')
        

        console.log(accToken)
        const match = jwt.verify(accToken, process.env.JWT_KEY, /*{ignoreExpiration: true},*/ async (err, decode) => {
            console.log('decode', decode)


            // decode가 있으면 acc로 인증 
            if(decode) { 
                req.user = match;
                next() 
            }



            // 없으면 refresh 
            if(err) {
                console.log('acc 토큰 만료돼서 refresh 토큰 으로 인증하고 다시 발급')
                const getRefreshToken = req.header('X-refresh-token')
                const refreshTokenDecode = decodeURIComponent(getRefreshToken)
                

                const user = await User.findOne({ token: refreshTokenDecode })
                // console.log('유저토큰', user.token)
                // console.log('유저토큰', refreshTokenDecode)
                // console.log('비교', refreshTokenDecode === user.token)
    
                // compare 할 필요없는듯?
                // const refreshTokenMatch = await bcrypt.compare(refreshTokenDecode, user.token)
                // const match = await jwt.verify(refreshTokenMatch, process.env.JWT_KEY)
    
                const refreshMatch = refreshTokenDecode === user.token;
                if(!getRefreshToken) return res.status(400).json({ err: 'is not refresh token' })
                if(refreshMatch) {
                    req.user = user 
                    next() 
                }
            }
        })




         //{ _id: '627c7b6cad3ac52d28a40418', iat: 1652419267 }

        //  console.log('인증토큰 ?? ', match)


        // if(!accToken) return res.status(400).json({ err: 'is not access token' })
        // if(!match) return res.status(400).json({ err: 'not match' })
       
        // if(match) {
        //     // match === {id: '', }
        //     console.log('auth in', match)
        //     req.user = match;
        //     next()
        // } 
}


