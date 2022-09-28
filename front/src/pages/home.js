import React, { useEffect } from 'react';

// components
import ImageUploadForm from '../components/image/ImageUploadForm.js'
import Auth from '../components/user/Auth.js'
import LoginForm from '../components/user/LoginForm.js'
import { Calender } from '../components/calender/Calender.js'


const Home = () => {


    return (
        <div>
            Home
            <br />
            <br />
            <br />
            <ImageUploadForm />
            <Auth />
            <br />
            <br />
            <br />
            longinform
            <LoginForm />
            <br />
            <br />
            <Calender />
        </div>
    );
};

export default Home;
