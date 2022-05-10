import express from 'express';
import multer from 'multer';
import { v4 } from 'uuid';
import mime from 'mime-types'; //file type 지정
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv'




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


const app = express();
const PORT = 5000;

// app.use(cors())
app.use('/uploads', express.static('uploads')) //http://localhost:5000/uploads/ae791f20-ca35-4e95-919b-655d94791127.jpeg 이거 접근됨...이거 없음 접근안됨

dotenv.config()


mongoose.connect(process.env.MONGODB_URI, {
    // useCreateIndex: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => {

    console.log('mongodb connected')
    
    app.post('/upload', upload.single("image"), (req, res) => { 
        //post로 이미지를 보낼때 이미 req에 저장이 되어있음. upload(미들웨어)를 이용해서 저장된 이미지 가져옴 
        // postman  body -> form-data -> key에 위에 미들웨어와 동일한 키값 image넣음
        
        console.log(req.file)
        res.json(req.file);
    })


    app.get('/test', (req, res) => {
        res.json('hehe')
    })
      


    app.listen(PORT, () => console.log('express server listening port ' + PORT))


}).catch(err => console.error(err))

