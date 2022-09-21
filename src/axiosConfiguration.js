import axios from 'axios';
import router from './router'
// import store from './store';
axios.defaults.baseURL = 'http://localhost:9090/api/v1/'
if(localStorage.getItem("accessToken") != null){ 
    axios.defaults.headers = { 'Accept':'application/json','Content-Type':'application/json'},
    axios.defaults.headers = {'Authorization': 'Bearer '+ localStorage.getItem('accessToken')}
   
} 


axios.interceptors.response.use((response) => {
    return response
}, async (error) => { 
    if( error.response.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userData");
        router.replace("/login");
    }
    return Promise.reject(error)
});