import axios from 'axios';



export const axiosModule = ({ method, URI, data, config }) => {
    return axios[method](`http://localhost:5000${URI}`, data, config);    
}