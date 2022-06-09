import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './assets/css/reset.css'
import './assets/css/global.css'

import { ImageProvider } from './context/ImageContext.js'
import RoutesPage from './pages/index.js'



const App = () => {

  return (
    
        <div className="App"> 
          <BrowserRouter>
            <ToastContainer />
            <ImageProvider>
              <RoutesPage />
            </ImageProvider>
          </BrowserRouter>
          
        </div>
    
  );
}

export default App;
