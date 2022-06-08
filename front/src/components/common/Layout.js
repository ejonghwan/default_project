import React, { Fragment } from 'react';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'


const Layout = ({ children }) => {
    return (
        <div id='main_wrap'>
            <Header />
            <Main>
                {children}
            </Main>
            <Footer />
        </div>
    );
};

export default Layout;