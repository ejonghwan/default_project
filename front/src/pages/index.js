import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';


import Layout from '../components/common/Layout.js'

import Home from './home.js'
import About from './about.js'
import Profile from './profile.js'
import Signup from './signup.js'
import StyleGuide from './guide/styleGuide.js'



const RoutesPage = () => {

    
    return (
        <Fragment>
            <Layout>
                {/* <ImageUploadForm /> */}
                {/* <Context_test /> */}
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/about' element={<About />}></Route>
                    <Route path='/profile' element={<Profile />}></Route>
                    <Route path='/signup' element={<Signup />}></Route>
                    <Route path='/style' element={<StyleGuide />}></Route>
                </Routes>
            </Layout>
        </Fragment>
    );
};

export default RoutesPage;