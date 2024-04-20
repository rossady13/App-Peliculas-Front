import axios from "axios";

const axiosInstance = axios.create({
     //baseURL: 'http://localhost:4000/'
    baseURL: 'https://app-bk-i9x6.onrender.com/'
});

export{
    axiosInstance,
}