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

            const mailOption = mailOpt(req.body.email, '인증메일 입니다.', mailTemplate);
            sendMail(mailOption)
            req.token = token;
            req.authCode = authCode;
            next();
        })
        
        
    } catch(err) {
        console.error(err)
    }
}


