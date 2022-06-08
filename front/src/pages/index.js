import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';

import ImageUploadForm from '../components/ImageUploadForm.js'
import Context_test from '../components/Context_test.js'
import Layout from '../components/common/Layout.js'


import Home from './home.js'
import About from './about.js'
import Profile from './profile.js'



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
                </Routes>
            </Layout>
        </Fragment>
    );
};

export default RoutesPage;