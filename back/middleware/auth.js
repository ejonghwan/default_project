import jwt from 'jsonwebtoken';
import User from '../models/users.js'
import bcrypt from 'bcrypt'


// 토큰 인증 미들웨어
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
                const user = await User.findOne({ id: match.id }).select({ password: 0, qeustion: 0, token: 0 })
                req.user = { accToken, ...user._doc }
                next() 

            } else {

                // 인증토큰 만료되어 리프레시 토큰으로 인증할 경우
                const getRefreshToken = req.cookies["X-refresh-token"]
                if(!getRefreshToken) return; // client에서 cookie로 리프레시토큰없으면 return
                console.log('acc 토큰 만료돼서 refresh 토큰 으로 인증하고 다시 발급')

                const refreshTokenDecode = decodeURIComponent(getRefreshToken)
                const user = await User.findOne({ id: match.id }).select({ password: 0, qeustion: 0 })


                // db에 저장된 리프레시가 만료되었을 경우 => db토큰 새로 교체하고 acc토큰 발급
                const dbToken = await jwt.verify(user.token, process.env.JWT_KEY, {ignoreExpiration: true})
                if(dbToken.exp < Date.now().valueOf() / 1000) {
                    user.token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: "30 days" })
                    user.save().then(user => {
                        const acctoken = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: "2h" })
                        req.user = { accToken, ...user._doc }
                        req.reftoken = user.token,
                        next();
                    });
                };


                // 넘어온 리프레시 토큰이 참이고 만료기간이 안 지난경우 => acc토큰 새로 발급
                const refreshTokenMatch = await bcrypt.compare(user.token, refreshTokenDecode)
                if(refreshTokenMatch && dbToken.exp > Date.now().valueOf() / 1000) {
                    // 2시간짜리 토큰 재발급
                    const acctoken = await jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: "2h" })
                    req.user = { accToken: acctoken, ...user._doc };
                    next();
                };
            };
        } else {
            return res.status(400).json({ message: "토큰 만료. 로그인 다시 해주세요" });
        }
       

    } catch(err) {
        console.log(err);
        return res.status(400).json({ message: "인증에러" });
    };
};


