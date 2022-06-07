import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ImageProvider } from './context/ImageContext.js'

import Home from './pages/Home.js'

const App = () => {

  return (
    
        <div className="App"> 
          
            <ToastContainer />
            <ImageProvider>
              <Home />
            </ImageProvider>
          
        </div>
    
  );
}

export default App;
