import axios from 'axios';



export const axiosModule = ({ method, URI, data, config }) => {
    return axios[method](`http://localhost:5000${URI}`, data, config,);    
}


export const delay = (endSecond, cb) => {
    if(!endSecond || !cb) return console.error('인수 모두 채워주세요');
    if(typeof endSecond !== 'number' || typeof cb !== 'function' ) {
        console.error('인수 타입체크해주세요')
    }
    setTimeout(() => {
        cb()
    }, endSecond * 1000)

}


export const timer = (endSecond, startingPoint, cb) => {
    if(!endSecond || !startingPoint || !cb ) return console.error('인수 모두 채워주세요');
    if(typeof endSecond !== 'number' || typeof startingPoint !== 'number' || typeof cb !== 'function' ) {
        console.error('인수 타입체크해주세요')
    }
    const countPoint = endSecond - startingPoint //startingPoint = 몇초가 지났을때
 
    setTimeout(() => {
        let down = startingPoint;
        let time = setInterval(() => {
            down -= 1
            
            cb(down)
            if(down <= 0) { clearInterval(time) }
        }, 1000)
    }, countPoint * 1000)
  
}


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


