import React, { useState, useEffect, useContext, useRef } from 'react';
import { BrowserRouter, useSearchParams  } from 'react-router-dom';
import axios from 'axios';

// module
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// css
import './assets/css/reset.css'
import './assets/css/global.css'

import RoutesPage from './pages/index.js'

// util
import { getQueryString } from './utils/utils.js'


// context & request
import { ImageProvider } from './context/ImageContext.js'
import { UserProvider, UserContext } from './context/UserContext.js'
import UserRequest from './reducers/UserRequest.js'
// import { getUser } from './reducers/UserRequest.js'


const App = () => {

  const { getUser } = UserRequest();
  const {state, dispatch} = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const valid = searchParams.get('valid');
  const accToken = searchParams.get('accToken');

  // 유저 새로고침
  const userLoad = async () => {
    try {
      const accToken = await localStorage.getItem('X-access-token');
      if(!accToken) return;

      dispatch({ type: "LOADING", loadingMessage: "" });
      const user = await getUser(); 
      const data = user.data;

      // if(!state.isLogged) { localStorage.removeItem('X-access-token') };

    } catch(err) {
      console.error('catch?', err);
    };
  };

  const userEmailLoad = async () => { //메일로 유입되는 유저는 acc토큰 넘겨줌
    try {
      if(accToken && valid) {
          if(!accToken) throw new Error('is not acctoken');
          dispatch({ type: "LOADING", loadingMessage: "" })
          const user = await getUser(accToken);
          // searchParams.delete('valid') //이거 왜 안되지 ..
          // searchParams.delete('accToken')
          window.location.href = '/'
      }
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    userLoad()
    userEmailLoad()
    dispatch({type: "ERROR_LOADING_CLEAR"})
    // console.log(state.isLogged)
    
  }, [])


  useEffect(() => {
    // console.log(state)
  }, [state])
 
  return (
      <div className="App"> 
        <RoutesPage />
        {/* <div className="hoho" ref={html}>{}</div> */}
      </div>
  );
}



export default App;

















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