import axios from 'axios'; 
axios.defaults.baseURL = 'http://localhost:9090/api/v1/'
if(localStorage.getItem("userData") != null){ 
    axios.defaults.headers = { 'Accept':'application/json','Content-Type':'application/json'}
   
} 

// // Add a request interceptor
axios.interceptors.request.use(function (config) {
    const token = "Bearer "+ localStorage.getItem('accessToken');
    if( localStorage.getItem('accessToken') != null){ 
        config.headers.Authorization =  token;   
    }
        return config;
    });

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
    return Promise.reject(error)
});