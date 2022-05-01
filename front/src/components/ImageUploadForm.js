import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


import './ImageUploadForm.css'
import ProgressBar from './ProgressBar.js'

const ImageUploadForm = () => {

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("이미지파일 업로드 해주세요")
    const [persent, setPersent] = useState(0) 

    const handleInputChange = e => {
        // console.log(e.target.files[0])
        const imageData = e.target.files[0]
        setFile(imageData)
        setFileName(imageData.name)
        // console.log(file)
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file) //form data에 배열로 담김
      
        try {
            const res = await axios.post('/upload', formData, {
                headers: {"Content-Type":"multipart/form-data"},
                onUploadProgress: ProgressEvent => {
                    console.log(ProgressEvent)
                    setPersent( Math.round(100 * ProgressEvent.loaded / ProgressEvent.total) )
                }
            })
            console.log({res})
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
                {/* <label htmlFor='image' >{fileName}</label> */}
                {persent}
                <ProgressBar persent={persent} />
                <div className={'imageDropBox'}>
                    {fileName}
                    <input id="image" type="file" onChange={handleInputChange}/>

                </div>
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}

export default ImageUploadForm;