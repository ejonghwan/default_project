import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import './Header.css'


//context 
import {UserContext} from '../../context/UserContext.js'
import axios from 'axios';


const Header = () => {

    const { state, dispatch } = useContext(UserContext)
    

    

  function setCookie(name, value, options = {}) {

    options = {
      path: '/',
      // 필요한 경우, 옵션 기본값을 설정할 수도 있습니다.
      ...options
    };
  
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
  }
  
  // Example of use:
  // setCookie('user', 'John', {secure: true, 'max-age': 3600});


  function deleteCookie(name) {
    setCookie(name, "", {
      'max-age': -1
    })
  }



    const handleLogout = async () => {
        
        const accToken = localStorage.getItem('X-access-token')
        if(!accToken) {return false}
        const user = await axios.get(`http://localhost:5000/api/users/logout?${state.user._id}`, {
          headers: {
            'X-access-token': accToken,
          },
          withCredentials: true,
        })

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