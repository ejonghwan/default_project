import express from 'express'
import ImageModel from '../models/images.js'
import upload from '../middleware/imageUpload.js'

const router = express.Router()


// @ POST /api/images
// @ public
// @ image upload
router.post('/', upload.single("image"), async (req, res) => { 
    try {
        //post로 이미지를 보낼때 이미 req에 저장이 되어있음. upload(미들웨어)를 이용해서 저장된 이미지 가져옴 
        // postman  body -> form-data -> key에 위에 미들웨어와 동일한 키값 image넣음
        if(!req.file) return res.status(400).json({ message: 'is not file' })
        
        const image = await new ImageModel({
            key: req.file.filename, 
            originalFileName: req.file.originalname,
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
// @ all image load
router.get('/', async (req, res) => {
    try {
        const images = await ImageModel.find()
        // console.log(images)
        res.status(201).json(images)
    } catch(err) {
        console.error(err)
    }
})




export default router;