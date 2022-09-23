import axios from 'axios';
const getHeaderAuthorization = {
    headers: {Authorization: "Bearer " + localStorage.getItem("accessToken"),}
}
const  deleteUser = await function(id) { return  axios.delete(`user/${id}`,getHeaderAuthorization)}
const  addUser = await function(credentials) { return  axios.post(`user`,credentials,getHeaderAuthorization)}


export { deleteUser ,addUser};