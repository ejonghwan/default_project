import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import './Header.css'

// componenets
import LogoutForm from '../../components/user/LogoutForm.js'


// import { logoutUser } from '../../reducers/UserRequest.js'
import UserRequest from '../../reducers/UserRequest.js'

//context 
import { UserContext } from '../../context/UserContext.js'
import axios from 'axios';


const Header = () => {
    const { logoutUser } = UserRequest();
    const { state, dispatch } = useContext(UserContext)
    
    const handleLogout = async () => {
      try {
        dispatch({ type: "LOADING", loadingMessage: "로그아웃 중.." })
        const user = await logoutUser();
      } catch(err) {
        console.err(err)
      }
    }


    // 이거 새로고침에도 없어짐;; 브라우저 종료하면 로컬저장소 없애는거 해야됨
    // window.onbeforeunload = function() {
    //   localStorage.removeItem('X-access-token');
    //   return '';
    // };


    


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
            {state.isLogged && <LogoutForm />}
        </header>
    );
};

export default Header;