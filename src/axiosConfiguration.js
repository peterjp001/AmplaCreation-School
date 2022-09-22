import axios from 'axios';
// import router from './router'
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
        axios.get("refreshToken", {
            headers: {Authorization: "Bearer " + localStorage.getItem("refreshToken"),}
        }).then((res)=>{
            localStorage.setItem("accessToken", res.data.access_token);
            localStorage.setItem("refreshToken", res.data.refresh_token);
        }).catch(()=>{
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userData"); 
        window.location.href = "/login";
        })
     
    }
    // if(error.code === '"ERR_NETWORK"') console.log("ok ok");
    return Promise.reject(error)
});