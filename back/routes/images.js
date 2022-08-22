import express from 'express'
import multer from 'multer';
import { v4 } from 'uuid';
import mime from 'mime-types'; //file type 지정
import ImageModel from '../models/images.js'




const router = express.Router()

// 아래로 수정 const upload = multer({ dest: "uploads" }) //dest: 업로드할 경로. 자동으로 생성됨
const storage = multer.diskStorage({ //파일의 고유아이디 저장을 컨트롤 하기 위해 
    destination: (req, file, cb) => cb(null, "./uploads"),
    filename: (req, file, cb) => {cb(null, `${v4()}.${mime.extension(file.mimetype)}`);}
})
/*
req: request 정보 
file: 파일정보 
cb: 콜백
destionation: 어디에 저장할지 
filename: 어떤 이름으로 저장할지
*/


const upload = multer({ 
    storage, 
    fileFilter: (req, file, cb) => {
        if(['image/jpeg', 'image/png', 'image/jpg'].includes(file.mimetype)) {
            return cb(null, true)
        } else {
            return cb(new Error('invalid file type'), true) //처음: 오류, 두번째 불리언값 true=저장.
        };
       
    },
    limits: {
        fileSize: 1024 * 1024 * 5, //1024 * 1024 = 1mb 
    },
})






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