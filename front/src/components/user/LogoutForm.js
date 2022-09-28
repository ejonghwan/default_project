import React, { useContext, useEffect } from 'react';

// components
// import { logoutUser } from '../../reducers/UserRequest.js'
import UserRequest from '../../reducers/UserRequest.js'

//context 
import { UserContext } from '../../context/UserContext.js'
import axios from 'axios';

const LogoutForm = () => {
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



    return (
        <div>
            <span>name: {state.user && state.user.name} </span>
            <button onClick={handleLogout}>logout</button>
        </div>
    );
};

export default LogoutForm;