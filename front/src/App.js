import React, { useEffect, useContext } from 'react';
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
  const [searchParams] = useSearchParams();
  

  // 유저 새로고침
  const userLoad = async () => {
    try {
      const accToken = localStorage.getItem('X-access-token')
      if(!accToken) return;

      await dispatch({ type: "LOADING", loadingMessage: "" })
      const user = await getUser();
      const data = user.data;
      dispatch({type: "USER_LOAD_SUCCESS", data})

    } catch(err) {

      dispatch({ type: "USER_LOAD_FAILUE" })
      console.error(err)
    }
  }


  // 메모
  // react-router-dom v6 이상 쓰시는 분들은
  // useSearchParams 를 사용해 보세요
  
  // import { useSearchParams } from 'react-router-dom';
  
  // const [searchParams] = useSearchParams();
  // const detail = searchParams.get('detail') === 'true';
  
  // qs 없이 쿼리스트링을 편하게 가져올수 있습니다


  const userEmailLoad = async () => {
    try {


    console.log('useremailLoad')
  
    const valid = searchParams.get('valid');
    const accToken = searchParams.get('accToken');

    if(accToken && valid) {
        if(!accToken) return;
        console.log('???????????????????????????????????????')
        await dispatch({ type: "LOADING", loadingMessage: "" })
        const user = await getUser(accToken);
        const data = user.data;
        dispatch({type: "USER_LOAD_SUCCESS", data})


        console.log('valid', valid)
        console.log('accToken', accToken)
    }

     


    } catch(err) {
    
      dispatch({ type: "USER_LOAD_FAILUE" })
      console.error(err)
    }
    
  }


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
      </div>
  );
}



export default App;
