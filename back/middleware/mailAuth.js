import nodeMailer from 'nodemailer'
import ejs from 'ejs'
import dotenv from 'dotenv'

import path from 'path'
import { fileURLToPath } from 'url';

// model
import User from '../models/users.js'


// 신카 레디오 버튼 접근성
//https://www.shinhancard.com/mob/MOBFM031N/MOBFM031R01.shc?netfunelAfterActionKey=25701


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __dirname2 =path.resolve(); 

console.log(`${__dirname2}/template/authMail.ejs`)


dotenv.config()

export const mailAuth = async (req, res, next) => {

    const authCode = Math.random().toString().substring(2, 8);
    let mailTemplate = null;
    ejs.renderFile(`${__dirname2}/template/authMail.ejs`, {authCode : authCode}, (err, data) => {
        if(err) {return console.error('ejs render error')}
        if(data) {
            mailTemplate = data;
        }
        
    })


    console.log('????????', mailTemplate)

    const mailPoster = nodeMailer.createTransport({
        service: 'Naver',
        host: 'smtp.naver.com',
        port: 587,
        auth: {
          user: process.env.MAIL_ID,
          pass: process.env.MAIL_PASSWORD,
        }
      });

      
    const mailOpt = (user_data, title, contents) => {
        const mailOptions = {
        // from: '네이버 아이디 @ naver.com',
        // from: req.body.email,
        from: process.env.MAIL_ID,
        to: 'jjongrrr@naver.com',
        subject: '인증메일 입니다. 인증 번호를 입력해주세요.',
        text: mailTemplate,
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


    const mailOption = mailOpt();
    sendMail(mailOption)

}


