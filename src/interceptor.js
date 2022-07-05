import axios from 'axios';
import SecureLS from "secure-ls";

 const instance = axios.create();
 instance.interceptors.request.use(function (config) {
    var ls = new SecureLS();
    const token = ls.get("token");
   
    if(token){
        config.headers.common['authorization']= `Bearer ${token}` ;
    }
 

    return config;
});

export const axiosInstance= instance;