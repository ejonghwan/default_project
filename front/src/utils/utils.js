import axios from 'axios';



export const axiosModule = ({ method, URI, data, config }) => {
    return axios[method](`http://localhost:5000${URI}`, data, config,);    
}


export const timer = (endSecond, cb) => {
    const start = Date.now();
    setTimeout(() => {
        const millis = Math.floor((Date.now() - start) / 1000)
        console.log('m', millis)
        cb()
    }, endSecond * 1000)

}






const test = () => {
    // var sampleTimestamp = Date.now(); //현재시간 타임스탬프 13자리 예)1599891939914
    // var date = new Date(sampleTimestamp); //타임스탬프를 인자로 받아 Date 객체 생성

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
