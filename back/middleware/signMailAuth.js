import nodeMailer from 'nodemailer';
import ejs from 'ejs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import path from 'path'
import { fileURLToPath } from 'url';
import { mailOpt, sendMail } from '../utils/util_emailAuth.js'

// model
import User from '../models/users.js'


// 신카 레디오 버튼 접근성
//https://www.shinhancard.com/mob/MOBFM031N/MOBFM031R01.shc?netfunelAfterActionKey=25701


const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const __dirname = path.resolve(); 

dotenv.config()


// 회원가입 메일발송
export const signMailAuth = async (req, res, next) => {
    try {
        /*
            이메일 체크 후 
            user true =  email jwt token 전달하면서 로그인 인증 로직 : 버튼 클릭 시 유저정보 찾아서 res / 홈 화면으로
            user false =  email jwt token 전달하면서 회원가입 인증 로직 : 버튼 클릭 시 회원가입 페이지로 
        */
        const { email } = req.body;
        const user = await User.findOne({ email: email })
        if(!email || typeof email !== 'string') return console.error('is not email');
        if(user) return res.status(400).json({ message: '동일한 메일이 이미 존재합니다' }) 


        await jwt.sign({ email: email }, process.env.JWT_KEY, { expiresIn: "1h" }, (err, token) => {
            if(err) return console.error(err)
             // const authCode = Math.random().toString().substring(2, 8);
            let mailTemplate = null; //이거 스택 하나 밖에 있을떈 왜 안됨 ?
            let templateName = null;
            user ? templateName = 'authSigninMail' : templateName = 'authSignupMail';
            
            ejs.renderFile(`${__dirname}/template/${templateName}.ejs`, {emailAuthToken : token}, (err, data) => {
                if(err) {return console.error('ejs render error')}
                if(data) { mailTemplate = data;}
            })

            const mailOption = mailOpt(req.body.email, '인증메일 입니다.', mailTemplate);
            sendMail(mailOption)
            next()
        })
        
        
    } catch(err) {
        console.error(err)
        res.status(400).json({ message: err.message }) 
    }
}


