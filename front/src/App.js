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



  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }


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


  async function test() {
    const data = await axios.get('http://localhost:5000/api/users/test')
    console.log(data)
  }

  useEffect(() => {
    load()
    console.log( getCookie('X-refresh-token') )
    console.log(document.cookie)

    test()


  }, [])
 

 

  

  return (
    
        <div className="App"> 
          <RoutesPage />
        </div>
    
  );
}

export default App;
