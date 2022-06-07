import React from 'react';

import ImageUploadForm from '../components/ImageUploadForm.js'
import Context_test from '../components/Context_test.js'
import Layout from '../components/layout/Layout.js'



const Home = () => {
    return (
        <div>
            <Layout>
                <ImageUploadForm />
                <Context_test />
            </Layout>
        </div>
    );
};

export default Home;