import React, { useReducer, useState } from 'react'


import { reducer, intialState } from '../reducers/index.js'



const Context_test = (props) => {

    const [ state, dispatch ] = useReducer(reducer, intialState);
    console.log('test: ', state.test)


    const handleClick = e => {
        e.preventDefault();
        dispatch({ type: 'TEST_REQUEST' })
        
    }

    return (
        <div>
            {state.test ? (<span>false</span>) : (<span>true</span>)}
            
            <button onClick={handleClick}>clicl me context api </button>
        </div>
    )
}


export default Context_test;