import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


import './ImageUploadForm.css'
import ProgressBar from './ProgressBar.js'

const ImageUploadForm = () => {
    const defaultFileName = '이미지 삽입'
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("이미지파일 업로드 해주세요")
    const [persent, setPersent] = useState(0) 
    const [imageUrl, setImageUrl] = useState(null);
    


    const handleInputChange = e => {
        // console.log(e.target.files[0])
        const imageData = e.target.files[0]
        setFile(imageData)
        setFileName(imageData.name)
        // console.log(file)
        const fileReader = new FileReader();
        fileReader.readAsDataURL(imageData)
        fileReader.onload = e => setImageUrl(e.target.result)
    }



    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file) //form data에 배열로 담김
      
        try {
            const res = await axios.post('http://localhost:5000/images', formData, {
                headers: {"Content-Type":"multipart/form-data"},
                onUploadProgress: ProgressEvent => {
                    console.log(ProgressEvent)
                    setPersent( Math.round(100 * ProgressEvent.loaded / ProgressEvent.total) )
                    setTimeout(() => {
                        setPersent(0)
                        setFileName(defaultFileName)
                    }, 3000)
                }
            })
            console.log({ res })
            toast.success('t')
        } catch (err) {
            toast.error(err.message)
            console.error(err)
        }
    }

    // useEffect(() => {

    // }, [setPersent])
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <img src={imageUrl} style={{width: "200px"}}/>
                {/* <label htmlFor='image' >{fileName}</label> */}
                {persent}
                <ProgressBar persent={persent} />
                <div className={'imageDropBox'}>
                    {fileName}
                    <input id="image" type="file" accept='image/png, image/jpg, image/*' onChange={handleInputChange}/>

                </div>
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}

export default ImageUploadForm;