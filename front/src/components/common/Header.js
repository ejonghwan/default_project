import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import './Header.css'


//context 
import {UserContext} from '../../context/UserContext.js'


const Header = () => {

    const { state, dispatch } = useContext(UserContext)
    

    const handleLogout = () => {
        dispatch({ type: "USER_LOGOUT" })
        localStorage.removeItem('X-access-token')
    }

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
            <span>name: {state.user.name} </span>
            <button onClick={handleLogout}>logout</button>
        </header>
    );
};

export default Header;