import jwt from 'jsonwebtoken';
import User from '../models/users.js'
import bcrypt from 'bcrypt'



// client 에서 넘어온 token값 보고 인증... 
export const accAuth = async (req, res, next) => {
    try {
        
        const accToken = req.header('X-access-token')
        const match = jwt.verify(accToken, process.env.JWT_KEY, /*{ignoreExpiration: true}*/)

         //{ _id: '627c7b6cad3ac52d28a40418', iat: 1652419267 }

         console.log('인증토큰 ?? ', match)


        if(!accToken) return res.status(400).json({ err: 'is not access token' })
        if(!match) return res.status(400).json({ err: 'not match' })
       
        if(match) {
            // match === {id: '', }
            console.log('auth in', match)
            req.user = match;
            next()
        } 
        

    } catch(err) {
        res.status(400).json({ err: 'is not user or token' })
        console.error(err)
    } 
}


export const refAuth = async (req, res, next) => {
    try {
        
        const accToken = req.header('X-access-token')
        const accMatch = jwt.verify(accToken, process.env.JWT_KEY, /*{ignoreExpiration: true}*/ (err, decode) => {
            console.log('asdsad', decode)
        })
        

             // access 토큰 만료 / 변경 시
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

            const match = refreshTokenDecode === user.token

            // console.log('match', match)

            console.log('여기실행왜안됨1111111111111111111?')

            if(!getRefreshToken) return res.status(400).json({ err: 'is not refresh token' })
            if(match) {
                // access token이 동일하지않으면 refresh 토큰 요청
                await jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: "1s" }, (err, accToken) => {
                    console.log('여기실행왜안됨?')
                    req.user = accToken
                    // {
                    //     accToken,
                    //     _id: user._id,
                    //     id: user.id,
                    //     email: user.email,
                    //     name: user.name, 
                    //     createdAt,
                    //     updatedAt,
                    // }
                })
                next()
                
            }
     
       

    } catch(err) {
        res.status(400).json({ err: 'rererererere' })
        console.error(err)
    } 
}


