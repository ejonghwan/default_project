import nodeMailer from 'nodemailer';
import ejs from 'ejs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import path from 'path'
import { fileURLToPath } from 'url';
import { mailOpt, sendMail } from '../utils/util_emailAuth.js'

// model
import User from '../models/users.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(); 

dotenv.config()

export const mailAuthNumber = async (req, res, next) => {
    try {

        
       
        const authCode = Math.random().toString().substring(2, 8);
        const { email } = req.body;
        const user = await User.findOne({ email: email })
        if(!email || typeof email !== 'string') return console.error('is not email');
        if(user) {return res.status(400).json({ message: '이미 가입된 이메일입니다.' })}

        await jwt.sign({ email: email }, process.env.JWT_KEY, { expiresIn: 180 }, async (err, token) => {
            // 인증시간 3분
            if(err) return console.error(err)

      
            let mailTemplate = null;
            await ejs.renderFile(`${__dirname}/template/authNumberMail.ejs`, {authCode : authCode}, (err, data) => {
                if(err) {return console.error('ejs render error', err)}
                if(data) { mailTemplate = data;}
            })

            
            
         // 만약 클라이언트에서 보낸 authNumber가 있다면 리턴
             if(req.body.authNumber) {
                req.token = token;
                req.authCode = authCode;
                return next()
            }
       
           
            console.log('여기오나 ?')
            const mailOption = mailOpt(req.body.email, '인증메일 입니다.', mailTemplate);
            sendMail(mailOption)
            next();
        })
        
        
    } catch(err) {
        console.error(err)
    }
}


