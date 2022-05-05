import axios from 'axios';


 const instance = axios.create();
 instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
   
    if(token){
        config.headers.common['authorization']= token ;
    }
 

    return config;
});

export const axiosInstance= instance;