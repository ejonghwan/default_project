import jwt from 'jsonwebtoken';


// client 에서 넘어온 token값 보고 인증... 
const auth = async (req, res, next) => {
    console.log(req.body);
}


