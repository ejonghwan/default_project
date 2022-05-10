import React, { useEffect, useContext } from 'react'

import { ImageProvider, ImageContext } from '../context/ImageContext.js'



const Test = (props) => {

    useEffect(() => {
        // console.log('test components')
    })

    const { state, dispatch } = useContext(ImageContext)

    console.log('test: ', state)
    console.log('test: ', dispatch)


    return (
        <div>Test</div>
    )
}

export default Test;