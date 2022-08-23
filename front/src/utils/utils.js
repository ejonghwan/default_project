import React from 'react';
import axios from 'axios';
import _debounce from 'lodash.debounce'


/** 
 * 딜레이 함수
 * @param {number} endSecond - 몇초 지연 후 실행할건지
 * @param {function} cb - 콜백함수()
 * @returns {undefined} 
 */
export const delay = (endSecond, cb) => {
    if(!endSecond || !cb) return console.error('인수 모두 채워주세요');
    if(typeof endSecond !== 'number' || typeof cb !== 'function' ) {console.error('인수 타입체크해주세요')}
    setTimeout(() => {
        cb()
    }, endSecond * 1000)

}



/** 
 * 타이머 함수
 * @param {number} endSecond - 끝나는 시간
 * @param {number} startingPoint - 카운팅 시작하는 시간
 * @param {function} cb - 콜백함수(카운트)
 * @param {undefined} initialVariable - 인터벌 저장할 변수
 * @returns {undefined} 
 */
export const timer = (endSecond, startingPoint, cb, initialVariable) => {
    if(!endSecond || !startingPoint || !cb ) return console.error('인수 모두 채워주세요');
    if(typeof endSecond !== 'number' || typeof startingPoint !== 'number' || typeof cb !== 'function' ) return console.error('인수 타입체크해주세요')

    const countPoint = endSecond - startingPoint //startingPoint = 몇초가 지났을때

    setTimeout(() => {
        let down = startingPoint;
        initialVariable = setInterval(() => {
            down -= 1
            cb(down)
            if(typeof down !== 'number') return console.error('타이머 타입체크')
            if(down <= 0) { clearInterval(initialVariable); }
        }, 1000)
    }, countPoint * 1000)
}



/** 
 * 초 단위로 계산해서 day hour minute second 으로 리턴
 * @param {number} totalNumber - 총 시간(초)
 * @param {string} viewTime - case: day, hour, minute, second
 * @returns {string} 일 시간 분 초 
 */
export const changeDate = (totalNumber, viewTime) => {
    if(typeof totalNumber !== 'number') return console.error('넘버로 넣어줭')
    let day = Math.floor(Math.floor(Math.floor(totalNumber / 60) / 60) / 24);
    let hour = Math.floor(Math.floor(totalNumber / 60) / 60) % 24;
    let minute = Math.floor(totalNumber / 60) % 60
    let second = totalNumber % 60

    switch(viewTime) {
        case 'day': return `${day}일 ${hour}시간 ${minute}분 ${second}초`
        case 'hour': return `${hour}시간 ${minute}분 ${second}초`
        case 'minute': return `${minute}분 ${second}초`
        case 'second': return `${second}초`
        default: return `${day}일 ${hour}시간 ${minute}분 ${second}초`
    }
}



/** 
 * 현재 시간 반환
 * @returns {string} 년 월 일 시간 분 초 
 */
export const initTime = () => {
    const sampleTimestamp = Date.now();
     // const millis = Math.floor((Date.now() - start) / 1000); //경과시간
     const date = new Date(sampleTimestamp); //타임스탬프를 인자로 받아 Date 객체 생성

    const year = date.getFullYear().toString().slice(-2); //년도 뒤에 두자리
    const month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
    const day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
    const hour = ("0" + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
    const minute = ("0" + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
    const second = ("0" + date.getSeconds()).slice(-2); //초 2자리 (00, 01 ... 59)

    const returnDate = year + "." + month + "." + day + ". " + hour + ":" + minute + ":" + second;
    return returnDate;
}



 /**
     * 상태 코드 첫 숫자 확인하는 함수
     * @param {Number} statusCode - 성공한 상태코드
     * @param {Number} matched - 비교할 넘버. 상태코드 첫숫자만 
     * @returns {boolean} - 비교 후 불리언 값 반환
     */
  export const statusCode = (statusCode, matched) => {
    const code = (statusCode).toString();
    const matchedNumber = (matched).toString();
    return code[0] === matchedNumber ? true : false
}




// 커스텀 디바운스 쓰로틀... 이해만 하고 그냥 로대쉬꺼 씀
// export const debounce = (cb, waitTime = 500) => {
//     let timeout;
//     return (...args) => {
//         if(timeout) clearTimeout(timeout);
//         timeout = setTimeout(() => {
//             cb(...args)
//         }, waitTime);
//     }
// }



// export const useDebounce = (value, waitTime = 500) => {
//     const [debounceValue, setDebounceValue] = React.useState(value) 
//     React.useEffect(() => {
//         const handler = setTimeout(() => {
//             setDebounceValue(value)
//         }, waitTime)

//         return () => {
//             clearTimeout(handler)
//         }
//     }, [value, waitTime])
//     return debounceValue
// }



// export const useDebounce = (cb, waitTime = 500, deps = []) => { 
//     const callback = React.useCallback(cb, deps)

//     React.useEffect(() => {
//         const timer = setTimeout(() => callback(), waitTime);
//         return () => clearTimeout(timer);
//         }, [callback, waitTime]);
// }




// export const throttle = (cb, waitTime = 0) => {
//     let waiting = true;
//     return (...args) => {
//         if(waiting) {
//             cb(...args)
//             waiting = false;
//             setTimeout(() => {
//                 waiting = true;
//             }, waitTime)
//         }
//     }
// }














const test = () => {
    // const sampleTimestamp = Date.now(); //현재시간 타임스탬프 13자리 예)1599891939914
    // const date = new Date(sampleTimestamp); //타임스탬프를 인자로 받아 Date 객체 생성

    // var year = date.getFullYear().toString().slice(-2); //년도 뒤에 두자리
    // var month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
    // var day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
    // var hour = ("0" + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
    // var minute = ("0" + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
    // var second = ("0" + date.getSeconds()).slice(-2); //초 2자리 (00, 01 ... 59)

    // var returnDate = year + "." + month + "." + day + ". " + hour + ":" + minute + ":" + second;
    // console.log(returnDate) 

    // 7200000 2h   
        // const start = Date.now();

        // console.log('starting timer...');
        // // expected output: starting timer...

        // const millis = (Date.now() + 7000) - start;
        // console.log(millis)

        // console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`);

        // setTimeout(() => {
        // const millis = Date.now() - start;
        // console.log(millis)

        // console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`);
        // // expected output: seconds elapsed = 2
        // }, 7000);
}





