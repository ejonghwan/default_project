import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { auth } from '../middleware/auth.js' ;
import { mailAuth } from '../middleware/mailAuth.js' ;

// model 
import User from '../models/users.js';

const router = express.Router();



//@ path    POST /api/auth
//@ doc     회원가입 메일인증
//@ access  public
router.post('/', mailAuth, async (req, res) => {
    try {
       
        console.log(req.body, '이메일인증')
        res.status(200).json({ message: '회원가입 링크가 이메일로 전송되었습니다.', email: req.body.email })
       
    } catch(err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
})


//@ path    GET /api/auth/signup
//@ doc     가입메일 요청
//@ access  public
router.get('/signup/', async (req, res) => {
    try {
       
        console.log(req.query, '이메일인증')

        //성공하면 회원가입페이지로 리디렉션
        //실패하면 에러페이지

        res.status(200).json('성공')
       
    } catch(err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
})


//@ path    GET /api/auth/login
//@ doc     가입메일 요청
//@ access  public
router.get('/login/', async (req, res) => {
    try {
       
        console.log(req.query, '이메일인증')
        res.status(200).json('성공')
       
    } catch(err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
})



export default router;