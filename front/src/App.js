import React, { useState, useEffect, useContext, useRef } from 'react';
import { BrowserRouter, useSearchParams  } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './assets/css/reset.css'
import './assets/css/global.css'

import { ImageProvider } from './context/ImageContext.js'
import { UserProvider, UserContext } from './context/UserContext.js'
import { getUser } from './reducers/UserRequest.js'
import RoutesPage from './pages/index.js'

import { getQueryString } from './utils/utils.js'


const App = () => {

  const {state, dispatch} = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const valid = searchParams.get('valid');
  const accToken = searchParams.get('accToken');



  // 유저 새로고침
  const userLoad = async () => {
    try {
      const accToken = await localStorage.getItem('X-access-token')
      if(!accToken) return;

      dispatch({ type: "LOADING", loadingMessage: "" })
      const user = await getUser(); //700 이후이니깐 기다려줘야되는데 안기다림
    

      const data = await user.data;
      dispatch({type: "USER_LOAD_SUCCESS", data})


    } catch(err) {
      dispatch({ type: "USER_LOAD_FAILUE" })
      console.error(err)
    }
  }



  const userEmailLoad = async () => {
    try {
      if(accToken && valid) {
          if(!accToken) return;
          dispatch({ type: "LOADING", loadingMessage: "" })
          const user = await getUser(accToken);
          const data = user.data;
          dispatch({type: "USER_LOAD_SUCCESS", data})

          // searchParams.delete('valid') //이거 왜 안되지 ..
          // searchParams.delete('accToken')
          window.location.href = '/'
      }
    } catch(err) {
      dispatch({ type: "USER_LOAD_FAILUE" })
      console.error(err)
    }
    
  }

  // static 파일 axios로 잘 붙는지 테스트
  // const [test, setTest] = useState(null) 
  // const html = useRef()
  // const aa = async () => {
  //   const hoho = await axios.get('http://localhost:3001/index2.html', {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
  //       'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
  //     }
  //   })
  //   // console.log(hoho.data)
  //   setTest(hoho.data)
  // }
  // useEffect(() => {
  //   aa();
  //   console.dir(html.current)
  //   // html.current.innerHTML += `${test}`
  // }, [])
  

  useEffect(() => {
    userLoad()
    userEmailLoad()

  }, [])


  useEffect(() => {
    console.log(state)
  }, [state])
 

  return (
      <div className="App"> 
        <RoutesPage />
        {/* <div className="hoho" ref={html}>{}</div> */}
      </div>
  );
}



export default App;
