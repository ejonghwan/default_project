import express from 'express';
import querystring from 'querystring'
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { auth } from '../middleware/auth.js' ;
import { mailAuth } from '../middleware/mailAuth.js' ;


dotenv.config();

// model 
import User from '../models/users.js';

const router = express.Router();




//@ path    POST /api/auth
//@ doc     회원가입 메일인증
//@ access  public
router.post('/', mailAuth, async (req, res) => {
    try {
       
        console.log(req.body, '이메일인증')
        res.status(200).json({ message: '이메일로 전송되었습니다.', email: req.body.email })
       
    } catch(err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
})


//@ path    GET /api/auth/signup
//@ doc     가입메일 요청
//@ access  public
router.get('/signup', async (req, res) => {
    try {
       
        console.log(req.query, '이메일인증')
        const { auth } = req.query;
        const match = jwt.verify(auth, process.env.JWT_KEY, {ignoreExpiration: true},) 
        const encode = encodeURIComponent(match.email)
   
        //성공하면 회원가입페이지로 리디렉션
        //실패하면 에러페이지
        const query = querystring.stringify({ valid: true, email: encode})
        res.redirect(`${process.env.DOMAIN}/signup?${query}`)
       
    } catch(err) {
        console.error(err)
        res.redirect(`${process.env.DOMAIN}/error`)
    }
})


//@ path    GET /api/auth/login
//@ doc     가입메일 요청
//@ access  public
router.get('/login', async (req, res) => {
    try {
        const { auth } = req.query;
        const match = jwt.verify(auth, process.env.JWT_KEY, {ignoreExpiration: true},) 
        // //{ email: 'jjongrrr@naver.com', iat: 1657599001, exp: 1657602601 }
        
        // console.log(match)
        const user = await User.findOne({ email: match.email })
     
        jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: "2h" }, (err, accToken) => {
            if(err) throw new Error(err)

            // token hash
            bcrypt.genSalt(10, async (err, salt) => {
                bcrypt.hash(user.token, salt,  (err, hash) => {

                    const query = querystring.stringify({ 
                        valid: true, 
                        accToken: accToken,
                    })
                    res.cookie('X-refresh-token', hash, { expires: new Date(Date.now() + 7200000), httpOnly: true });
                    res.redirect(`${process.env.DOMAIN}/?${query}`);
                    
                })
            })
        });

        
    } catch(err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
})



export default router;