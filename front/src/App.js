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

    if(!accToken) {return false}
    // const user = await axios.get(`http://localhost:5000/api/users/load?${state.user._id}`, {
    //   headers: {
    //     'X-access-token': accToken,
    //   }
    // })
    const user = await axios.get(`http://localhost:5000/api/users/load?_id=62be98414cbcfbe7fb1ec6ed`, {
      headers: {
        'X-access-token': accToken,
      }
    })
    dispatch({type: "USER_LOAD_SUCCESS", data: user.data})

  }


  async function test() {
    const data = await axios.get('http://localhost:5000/api/users/test', { 
      withCredentials: true // 쿠키 cors 통신 설정
    })
    console.log(data)
  }


  useEffect(() => {
    load()
    test()
  }, [])


  useEffect(() => {
    console.log(state)
  }, [state])
 

 

  

  return (
    
        <div className="App"> 
          <RoutesPage />
        </div>
    
  );
}

export default App;
