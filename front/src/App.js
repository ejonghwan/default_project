import React, { useState ,useEffect, useRef, createContext, useReducer } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import ImageUploadForm from './components/ImageUploadForm.js'
import Context_test from './components/Context_test.js'


import { reducer, intialState } from './reducers/index.js'
export const TestContext = createContext(null);



const App = () => {

  const [test, setTest] = useState('')

  const getData = async () => {
      const res = await axios.get('http://localhost:5000/test') 
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


  const [ state, dispatch ] = useReducer(reducer, intialState);
  console.log(state)
  // const { test } = state;

  return (
    <TestContext.Provider value={{ dispatch, test }}>
        <div className="App">
          <header className="App-header">
            <ToastContainer />
            <h1>gell</h1>
            <div ref={ele}></div>
            <button onClick={handleClick}>click</button>
          </header>
          <main>
            <ImageUploadForm />
            <Context_test />
          </main>
        </div>
    </TestContext.Provider>
  );
}

export default App;
