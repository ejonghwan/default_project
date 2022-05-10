import React, { useReducer, useContext, createContext } from 'react'
import { intialState, reducer } from '../reducers/index.js'


export const ImageContext = createContext(null);


export const ImageProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(reducer, intialState) 
    return (
        <ImageContext.Provider value={{ state, dispatch }}>
            {children}
        </ImageContext.Provider>
    )
}

