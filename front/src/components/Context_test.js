import React, { useReducer, useState, useEffect, useContext } from 'react'
import axios from 'axios'


import { ImageContext } from '../context/ImageContext.js' 


const Context_test = (props) => {


    
    const { state, dispatch } = useContext(ImageContext)



    const getData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/images')
            const data = await res.data;
    
            console.log('getData:', data)
            dispatch({ type: 'IMAGE_LOAD_REQUEST', data })
           
           } catch(err) {
               console.error(err)
           }
    }


    const handleClick = async e => {
        e.preventDefault();
      
        dispatch({ type: 'TEST_REQUEST', data: 'hoho'})
    }


    useEffect(() => {
        // console.log('???????')
        getData()
    }, [])


    return (
        <div>
            {state.test ? (<span>false</span>) : (<span>true</span>)}
            <button onClick={handleClick}>clicl me context api </button>
            <ul>
                {state.images.map(item => {
                    return (<li key={item.key ? item.key : item.filename}>
                        key: {item.key ? item.key : item.filename}<br />
                        name: {item.originalFileName}<br />
                        <img src={`http://localhost:5000/uploads/${item.key ? item.key : item.filename}`} style={{width: "200px"}} />
                    </li>)
                })}
            </ul>
           
           
        </div>
    )
}


export default Context_test;