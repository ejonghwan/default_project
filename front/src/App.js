import React, { useState ,useEffect, useRef, createContext, useReducer } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import ImageUploadForm from './components/ImageUploadForm.js'
import Context_test from './components/Context_test.js'
import Test from './components/Test.js'


import { ImageProvider } from './context/ImageContext.js'


const App = () => {

  const ele = useRef(null)

  const handleClick = e => {
    ele.current.innerHTML += test;
  }


  return (
    
        <div className="App"> 
          <header className="App-header">
            <ToastContainer />
            <h1>gell</h1>
            <div ref={ele}></div>
            <button onClick={handleClick}>click</button>
          </header>
          <main>
            <ImageProvider>
              <ImageUploadForm />
              <Context_test />
              <Test />
            </ImageProvider>
          </main>
        </div>
    
  );
}

export default App;
