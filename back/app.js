import express from 'express';

import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';



// router
import imagesRoutes from './routes/images.js'
import usersRoutes from './routes/users.js'






const app = express();
const PORT = 5000;

//http://localhost:5000/uploads/ae791f20-ca35-4e95-919b-655d94791127.jpeg 이거 접근됨...이거 없음 접근안됨
app.use('/uploads', express.static('uploads')) 
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
dotenv.config()





mongoose.connect(process.env.MONGO_URI, {}).then(() => {
    try {
        console.log('mongodb connect')
        app.use('/api/images', imagesRoutes)
        app.use('/api/users', usersRoutes)
        app.listen(PORT, () => console.log('express server listening port ' + PORT))

    } catch(err) {
        console.error(err)
    }
})

