import React, { useState, useRef, useEffect } from 'react';
import './ProgressBar.css'

const ProgressBar = props => {

    const barRef = useRef(null)

    const handlePersent = e => {
        // console.log(barRef.current)
        // console.log(props.persent)
        barRef.current.style.transform = `scaleX(${props.persent}%)`
    }

    useEffect(() => {
        handlePersent()
    }, [props.persent])

    return (
        <div className="progress-wrap">
            <div><span ref={barRef} className="bar">{props.persent}</span></div>
        </div>
    )
}

export default ProgressBar;