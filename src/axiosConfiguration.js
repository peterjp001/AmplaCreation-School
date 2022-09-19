import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:9090/api/v1/'
if(localStorage.getItem("accessToken") != null){
    console.log("access Token");
    axios.defaults.headers = { 'Accept':'application/json','Content-Type':'application/json'},
    axios.defaults.headers = {'Authorization': 'Bearer '+ localStorage.getItem('accessToken')}
}else{
    console.log("No access Token");
}
 