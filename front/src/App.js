import React, { useEffect, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './assets/css/reset.css'
import './assets/css/global.css'

import { ImageProvider } from './context/ImageContext.js'
import { UserProvider, UserContext } from './context/UserContext.js'
import RoutesPage from './pages/index.js'



const App = () => {

  // 여기까지함. 만약 acc token이 에러 뜬다면 쿠키 가져와서 X-refresh-token을 header 로 보내면 됨
  // const refreshCookie = getCookie('refresh')
  // console.log('cookie', refreshCookie)

  const {state, dispatch} = useContext(UserContext)

  const load = async () => {
    const accToken = localStorage.getItem('X-access-token')
    // const refToken = 

    if(!accToken) {return false}
    const user = await axios.get('http://localhost:5000/api/users/load?_id=62bbeba6f489f565dece382c', {
      headers: {
        'X-access-token': accToken,
        'X-refresh-token': '%242b%2410%24qP3Erobor4UINj92QR4L8OreDD8qRvdsEPkc7OMqM8PWjw5dGM%2F22',
      }
    })

    console.log(user)

    dispatch({type: "USER_LOAD_SUCCESS", data: user.data})
    
  }


  useEffect(() => {
    load()
  }, [])
 

 

  

  return (
    
        <div className="App"> 
          <RoutesPage />
        </div>
    
  );
}

export default App;
