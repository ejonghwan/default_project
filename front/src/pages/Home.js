import React, { useEffect } from 'react';

// components
import ImageUploadForm from '../components/image/ImageUploadForm.js'
import Auth from '../components/user/Auth.js'
import LoginForm from '../components/user/LoginForm.js'

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
            <LoginForm />
        </div>
    );
};

export default Home;