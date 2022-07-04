import jwt from 'jsonwebtoken';
import User from '../models/users.js'
import bcrypt from 'bcrypt'
// import cookieParser from 'cookie-parser'


// cookieParser()


// client 에서 넘어온 token값 보고 인증... 
export const auth = async (req, res, next) => {
        const accToken = req.header('X-access-token')
        if(accToken) {
            const match = jwt.verify(accToken, process.env.JWT_KEY, {ignoreExpiration: true},) 
             // decode가 있으면 acc로 인증 
             
            if(match && match.exp > Date.now().valueOf() / 1000) { 
                // console.log(match)
                console.log('acc 토큰으로 인증함')
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
            } else {
                // 없으면 refresh 
                
                console.log('acc 토큰 만료돼서 refresh 토큰 으로 인증하고 다시 발급')
                const getRefreshToken = req.cookies["X-refresh-token"]
                // if(!getRefreshToken) return res.status(400).json({ err: "로그인 다시 해주세요" });


                const refreshTokenDecode = decodeURIComponent(getRefreshToken)
                const user = await User.findOne({ _id: req.query._id })

                // user.token값 만료됐으면 다시 발급 절차 넣어야함
                // const match = await jwt.verify(refreshTokenMatch, process.env.JWT_KEY)
                
                const refreshTokenMatch = await bcrypt.compare(user.token, refreshTokenDecode)
                
                if(refreshTokenMatch) {
                    console.log('리프레시 만료돼서 새로 발급했음 2시간짜리 ')
                    const acctoken = await jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: "2h" })

                    console.log('새로발급한 acc 토큰: ', acctoken)
                    req.user = {
                        accToken: acctoken,
                        _id: user._id,
                        id: user.id,
                        email: user.email,
                        name: user.name, 
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                    }
                    next() 
                } else {
                    return res.status(400).json({ err: "로그인 다시 해주세요" })
                }
             
                // refresh token
            }

        } else {
            return res.status(400).json({ err: "acc 토큰 없음. 로그인 다시 해주세요" })
        }
       

        

}


