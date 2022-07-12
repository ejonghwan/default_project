import React, { useEffect } from 'react';

// components
import ImageUploadForm from '../components/image/ImageUploadForm.js'
import Auth from '../components/user/Auth.js'


const Home = () => {


    return (
        <div>
            Home
            <br />
            <br />
            <br />
            <ImageUploadForm />
            <Auth />
        </div>
    );
};

export default Home;