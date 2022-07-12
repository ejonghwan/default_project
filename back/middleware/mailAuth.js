import nodeMailer from 'nodemailer';
import ejs from 'ejs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import path from 'path'
import { fileURLToPath } from 'url';

// model
import User from '../models/users.js'


// 신카 레디오 버튼 접근성
//https://www.shinhancard.com/mob/MOBFM031N/MOBFM031R01.shc?netfunelAfterActionKey=25701


const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const __dirname =path.resolve(); 

dotenv.config()


export const mailAuth = async (req, res, next) => {
    try {
     
        const mailPoster = nodeMailer.createTransport({
            service: 'Naver',
            host: 'smtp.naver.com',
            port: 587,
            auth: {
              user: process.env.MAIL_ID,
              pass: process.env.MAIL_PASSWORD,
            },
            // 서명받지 않은 사이트의 요청도 받음
	        tls: {
                rejectUnauthorized: false,
              },
          });

          
        const mailOpt = (reqUser, title, contents) => {
            const mailOptions = {
            from: process.env.MAIL_ID,
            to: reqUser,
            subject: title,
            html: contents,
            };
        
            return mailOptions;
        }


        // 메일 전송
        const sendMail = (mailOption) => {
            mailPoster.sendMail(mailOption, function(error, info){
            if (error) {
                console.log('에러 ' + error);
            }
            else {
                console.log('전송 완료 ' + info.response);
                next()
            }
            });
        }


        /*
            이메일 체크 후 
            user true =  email jwt token 전달하면서 로그인 인증 로직 : 버튼 클릭 시 유저정보 찾아서 res / 홈 화면으로
            user false =  email jwt token 전달하면서 회원가입 인증 로직 : 버튼 클릭 시 회원가입 페이지로 
        */
        const { email } = req.body;
        const user = await User.findOne({ email: email })
        if(!email || typeof email !== 'string') return console.error('is not email');


        await jwt.sign({ email: email }, process.env.JWT_KEY, { expiresIn: "1h" }, (err, token) => {
            if(err) return console.error(err)
             // const authCode = Math.random().toString().substring(2, 8);
            let mailTemplate = null; //이거 하나 스택 하나 밖에 있을떈 왜 안됨 ?
            let templateName = null;
            console.log('user??', user)
            user ? templateName = 'authSigninMail' : templateName = 'authSignupMail';
            
            ejs.renderFile(`${__dirname}/template/${templateName}.ejs`, {emailAuthToken : token}, (err, data) => {
                if(err) {return console.error('ejs render error')}
                if(data) { mailTemplate = data;}
            })

            console.log('temp44', mailTemplate)
            const mailOption = mailOpt(req.body.email, '인증메일 입니다.', mailTemplate);
            sendMail(mailOption)
        })
        
        
    } catch(err) {
        console.error(err)
    }
}


