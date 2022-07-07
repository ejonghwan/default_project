import jwt from 'jsonwebtoken';
import User from '../models/users.js'
import bcrypt from 'bcrypt'


// client 에서 넘어온 token값 보고 인증... 
export const auth = async (req, res, next) => {
    try {
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

                // 인증토큰 만료되어 리프레시 토큰으로 인증할 경우
                console.log('acc 토큰 만료돼서 refresh 토큰 으로 인증하고 다시 발급')
                const getRefreshToken = req.cookies["X-refresh-token"]
                const refreshTokenDecode = decodeURIComponent(getRefreshToken)
                const user = await User.findOne({ id: match.id })
                

                // db에 저장된 리프레시가 만료되었을 경우
                const dbToken = await jwt.verify(user.token, process.env.JWT_KEY, {ignoreExpiration: true})
                if(dbToken.exp < Date.now().valueOf() / 1000) {
                    user.token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: "30 days" })
                    user.save().then(data => {
                        const acctoken = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: "2h" })
                        req.user = {
                            accToken: acctoken,
                            _id: data._id,
                            id: data.id,
                            email: data.email,
                            name: data.name, 
                            createdAt: data.createdAt,
                            updatedAt: data.updatedAt,
                        }
                        req.reftoken = data.token,
                        next();
                    });
                };


                // 리프레시 토큰이 참이고 만료기간이 안 지난경우
                const refreshTokenMatch = await bcrypt.compare(user.token, refreshTokenDecode)
                if(refreshTokenMatch && dbToken.exp > Date.now().valueOf() / 1000) {
                    const acctoken = await jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: "2h" })
                    // console.log('새로발급한 acc 토큰: ', acctoken)
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
                } 
             
            }

        } else {
            return res.status(400).json({ err: "acc 토큰 없음. 로그인 다시 해주세요" })
        }
       

    } catch(err) {
        console.log(err)
        return res.status(400).json({ err: "인증에러" })
    }
       
}


