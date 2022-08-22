import React, { Fragment, useEffect, useState } from 'react'
import { timer, changeDate } from '../../../utils/utils.js'


/** 
 * 타이머 컴포넌트
 * @param {number} endSecond - 끝나는 시간
 * @param {number} startingPoint - 카운팅 시작하는 시간
 * @param {string} countingName - 카운팅 옆 텍스트
 * @param {string} endMessage - 타이머 끝나면 나오는 텍스트
 * @param {function} callback - 타이머 끝나면 실행할 함수
 * @returns {component} timer component jsx
 */
const Timer = props => {
    const { endSecond, startingPoint, countingName, endMessage, callback } = props;
    const [ counting, setCounting ] = useState(0)
    const [ countingMessage, setCountingMessage ] = useState('')
    const [ countingToggle, setCountingToggle ] = useState(false)
    const [ endToggle, setEndToggle ] = useState(false)
        
    let time = null;

    useEffect(() => {
        timer(endSecond, startingPoint, count => {
            setCounting(count)
            if(counting) {count = 0}
            if(count <= startingPoint) { setCountingToggle(true) }
            if(count === 0) { setEndToggle(true); callback();}
            setCountingMessage(changeDate(count, 'minute'))
        }, time);
        
        return () => {
            clearInterval(time)
        };
    }, []);

    return (
        <Fragment>
            {countingToggle && (<p>{countingName}{countingMessage}</p>)}
            {endToggle && (<span style={{color: 'red'}}>{endMessage}</span>)}
        </Fragment>
    )
}

export default Timer;