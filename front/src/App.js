import React, { useState ,useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import ImageUploadForm from './components/ImageUploadForm.js'

const App = () => {

  const [test, setTest] = useState('')

  const getData = async () => {
      const res = await axios.get('/test') 
      const data = res.data
      return data;
  }


  useEffect(() => {
    getData().then((a)=> {
      // console.log(a)
      setTest(a)
    } )
    // console.log(data)
  }, [])

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
        <ImageUploadForm />
      </main>
    </div>
  );
}

export default App;
