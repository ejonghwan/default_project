import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
    return (
        <header id='header'>
            <nav>
                <ul>
                    <li><Link to="/">home</Link></li>
                    <li><Link to="/about">about</Link></li>
                    <li><Link to="/profile">profile</Link></li>
                    <li><Link to="/signup">signup</Link></li>
                    <li><Link to="/style">style</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;