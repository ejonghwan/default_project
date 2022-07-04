import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import './Header.css'


//context 
import {UserContext} from '../../context/UserContext.js'
import axios from 'axios';


const Header = () => {

    const { state, dispatch } = useContext(UserContext)
    


  const logout = async () => {
    const accToken = localStorage.getItem('X-access-token')
    // if(!accToken) {return false}
    const user = await axios.get(`http://localhost:5000/api/users/logout`, {
      headers: {
        'X-access-token': accToken,
      },
      withCredentials: true,
    })
    console.log(user)
  }

    const handleLogout = async () => {

      logout();
      dispatch({ type: "USER_LOGOUT" })
      // deleteCookie("X-refresh-token")
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