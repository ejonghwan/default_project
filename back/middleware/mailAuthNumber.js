import nodeMailer from 'nodemailer';
import ejs from 'ejs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

import path from 'path'
import { fileURLToPath } from 'url';
import { mailOpt, sendMail } from '../utils/util_emailAuth.js'

// model
import User from '../models/users.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(); 

dotenv.config()


// 회원이든 아니든 무조건 db에서 이메일찾아서 인증번호 보냄 // 한개 더 만들어야함....아래껀 가입된 이메일 걸러내는게 있네 ;;
export const mailAuthNumber = async (req, res, next) => {
    try {
        const authCode = Math.random().toString().substring(2, 8);
        const { email } = req.body;
        const user = await User.findOne({ email: email })
        if(!email || typeof email !== 'string') return console.error('is not email');
        if(user) {return res.status(400).json({ message: '이미 가입된 이메일입니다.' })}


        let mailTemplate = null;
        await ejs.renderFile(`${__dirname}/template/authNumberMail.ejs`, {authCode : authCode}, (err, data) => {
            if(err) {return console.error('ejs render error', err)}
            if(data) { mailTemplate = data;}
        })

        const mailOption = mailOpt(req.body.email, '인증메일 입니다.', mailTemplate);
        sendMail(mailOption)

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(authCode, salt, (err, hash) => {
                req.authCode = hash;
                next();
            })
        })
        
        
    } catch(err) {
        console.error(err)
    }
}



// 가입되었지만 비번/아이디 찾는 
export const nonLoginAuthNumber = async (req, res, next) => {
    try {

        console.log('여기넘어오나 ???????????????????????')
        const authCode = Math.random().toString().substring(2, 8);
        const { email } = req.body;
        const user = await User.findOne({ email: email })
        if(!email || typeof email !== 'string') return console.error('is not email');


        let mailTemplate = null;
        await ejs.renderFile(`${__dirname}/template/authNumberMail.ejs`, {authCode : authCode}, (err, data) => {
            if(err) {return console.error('ejs render error', err)}
            if(data) { mailTemplate = data;}
        })

        const mailOption = mailOpt(req.body.email, '인증메일 입니다.', mailTemplate);
        sendMail(mailOption)

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(authCode, salt, (err, hash) => {
                req.authCode = hash;
                next();
            })
        })
        
        
    } catch(err) {
        console.error(err)
    }
}



