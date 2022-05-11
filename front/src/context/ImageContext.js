import React, { useReducer, useContext, createContext } from 'react'
import { ImageIntialState, ImageReducer } from '../reducers/index.js'


export const ImageContext = createContext(null);


export const ImageProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(ImageReducer, ImageIntialState) 
    return (
        <ImageContext.Provider value={{ state, dispatch }}>
            {children}
        </ImageContext.Provider>
    )
}

