import express from 'express';
import ImageModel from '../models/images.js';
import upload from '../middleware/imageUpload.js';

import fs from 'fs';
import util from 'util';

import { auth } from '../middleware/auth.js';

const router = express.Router();
const unlink = util.promisify(fs.unlink);



// @ POST /api/images
// @ public
// @ desc 이미지 생성
router.post('/', auth, upload.single("image"), async (req, res) => { 
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
router.patch('/', auth, async (req, res) => {
    try {
      
    } catch(err) {
        console.error(err)
    }
})


// @ GET /api/images
// @ public
// @ desc 이미지 삭제
router.delete('/:filename', auth, async (req, res) => {
    try { //삭제 테스트 잘됨 / 프론트 아직 안함
        const { filename } = req.params;
        const img = await ImageModel.deleteOne({ key: filename })
        await unlink(`./uploads/${filename}`);
        res.end();
    } catch(err) {
        console.error(err)
    }
})

 


// 파퓰 테스트
// @ GET /api/images/pp
// @ public
// @ desc 이미지 삭제
router.get('/pp', async (req, res) => {
    try {
        const img = await ImageModel.findById('633d46a6d9ab95b3a0f74c9a').populate("user._id").exec();
        console.log(img)
        res.json(img)
    } catch(err) {
        console.error(err)
    }
})

/* 
    ** 100 < n < 1000 "부분저장"
    관계 맺을 때  1 : n 이면 (blog : comments)
    1. blog Model에는 코멘트를 다 넣거나 objectId 로 연결. 
    2. client로 res 할땐 Blog.findbyid(블로그아이디).populate(1번에서 저장된 옵젝아이디) 로 코멘트 다 넣고 보내줌


      1                               n
    blog                             commnet
                                     <- blog object id   
[comment Model] or 
[{ 코멘트 object id }] or 
[{ 코멘트 컨텐츠 그대로 }] ->


* 블로그 생성 할 땐 필드만...

* 코멘트 생성할 때 
    1. blog id 넣어주고
    2. 블로그 모델에 코멘트를 그대로 넣거나 id값 넣어줌 

    Blog.updateOne({ _id: blogId }, { $inc: { commentCount: 1 }, $push: { comments: { $each: [createComment], $slice: -3 } } })





블로그 글을 삭제할 땐 
삭제할 블로그글에 연결되어있던 코멘트도 삭제해야되기 때문에 Comment Model에서도 삭제해줌. <- 이건 확인해야됨 
const blogDelete = await Blog.findByIdAndDelete(blogId, { new: true }); //걍 블로그만 삭제하면 코멘트 삭제되나 ?


코멘트를 삭제할 땐 
블로그에 들어간 코멘트도 같이 삭제 
const deleteComment = await Comment.findByIdAndDelete(commentId) //코멘트 모델에서 삭제 
await Blog.updateOne({ 'comments._id': commentId }, { $pull: { comments: { _id: commentId } } }) //블로그 모델에서 삭제


*/


export default router;