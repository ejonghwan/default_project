import React, { Fragment } from 'react';
import Header from '../header/Header.js'
import Footer from '../footer/Footer.js'


const Layout = ({ children }) => {
    return (
        <Fragment>
            <Header />
            <main>{children}</main>
            <Footer />
        </Fragment>
    );
};

export default Layout;