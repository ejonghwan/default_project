import React, { useEffect, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './assets/css/reset.css'
import './assets/css/global.css'

import { ImageProvider } from './context/ImageContext.js'
import { UserProvider, UserContext } from './context/UserContext.js'
import { getUser } from './reducers/UserRequest.js'
import RoutesPage from './pages/index.js'



const App = () => {

  const {state, dispatch} = useContext(UserContext);

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


  useEffect(() => {
    userLoad()
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
