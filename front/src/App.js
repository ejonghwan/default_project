import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './assets/css/reset.css'
import './assets/css/global.css'

import { ImageProvider } from './context/ImageContext.js'
import { UserProvider } from './context/UserContext.js'
import RoutesPage from './pages/index.js'



const App = () => {

  // 여기까지함. 만약 acc token이 에러 뜬다면 쿠키 가져와서 X-refresh-token을 header 로 보내면 됨
  // const refreshCookie = getCookie('refresh')
  // console.log('cookie', refreshCookie)
  axios.get('http://localhost:5000/api/users/load', {
    headers: {
      'X-access-token': localStorage.getItem('X-access-token'),
      'X-refresh-token': '%242b%2410%24qP3Erobor4UINj92QR4L8OreDD8qRvdsEPkc7OMqM8PWjw5dGM%2F22',
    }
  })

 

  

  return (
    
        <div className="App"> 
          <BrowserRouter>
            <ToastContainer />
              <UserProvider>
                <ImageProvider>
                  <RoutesPage />
                </ImageProvider>
              </UserProvider>
          </BrowserRouter>
          
        </div>
    
  );
}

export default App;
