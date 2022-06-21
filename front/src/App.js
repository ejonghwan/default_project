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

  // axios.get('http://localhost:5000/api/users/load', {
  //   headers: {

  //   }
  // })

 

  

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
