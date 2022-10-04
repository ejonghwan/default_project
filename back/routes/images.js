import express from 'express';
import ImageModel from '../models/images.js';
import upload from '../middleware/imageUpload.js';

import { unlink, promises } from 'fs';


const router = express.Router()


// @ POST /api/images
// @ public
// @ desc 이미지 생성
router.post('/', upload.single("image"), async (req, res) => { 
    try {
        //post로 이미지를 보낼때 이미 req에 저장이 되어있음. upload(미들웨어)를 이용해서 저장된 이미지 가져옴 
        // postman  body -> form-data -> key에 위에 미들웨어와 동일한 키값 image넣음
        if(!req.file) return res.status(400).json({ message: 'is not file' })
        
        // 어떤건 body에 저장됨? 
        const image = await new ImageModel({
            user: {
                _id: req.body._id,
                name: req.body.name,
            },
            key: req.file.filename, 
            originalFileName: req.file.originalname,
            public: req.body.public,
        })
        image.save();
    
        // console.log(req.file)
        res.json(req.file);

    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})


// @ GET /api/images
// @ public
// @ desc 이미지 불러오기
router.get('/', async (req, res) => {
    try {
        const images = await ImageModel.find()
        // console.log(images)
        res.status(201).json(images)
    } catch(err) {
        console.error(err)
    }
})


// 이게 필요한가 ? 
// @ GET /api/images
// @ public
// @ desc 이미지수정
router.patch('/', async (req, res) => {
    try {
      
    } catch(err) {
        console.error(err)
    }
})


// @ GET /api/images
// @ public
// @ desc 이미지 삭제
router.delete('/', async (req, res) => {
    try {
        
    } catch(err) {
        console.error(err)
    }
})

 



export default router;