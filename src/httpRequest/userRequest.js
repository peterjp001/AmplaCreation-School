import axios from 'axios';
import qs from 'qs';
 
const authUser = await function(credentials){return  axios.post('login',qs.stringify(credentials),{ headers: {'Content-Type': 'application/x-www-form-urlencoded'}});}
const  allUsers = await function() { return  axios.get(`users`)}
const  getUser = await function(id) { return  axios.get(`user/${id}`)}
const  getProfile = await function() { return  axios.get(`profile`)}
const  deleteUser = await function(id) { return  axios.delete(`user/${id}`)}
const  addUserToEmployee = await function(code,credentials) { return  axios.post(`user/${code}`,credentials)}
const  addUser = await function(credentials) { return  axios.post(`user`,credentials)}
const  updateUser = await function(id,data) { return  axios.put(`user/${id}`,data)}
const  addRoleToUser = await function(role,username) { return  axios.post(`addroletouser/user/${username}/role/${role}`)}
const  removeRoleToUser = await function(role,username) { return  axios.post(`removeroletouser/user/${username}/role/${role}`)}


export {
    authUser,
    allUsers,
    getUser, 
    getProfile,
    deleteUser, 
    addUser, 
    addUserToEmployee,
    updateUser, 
    addRoleToUser, 
    removeRoleToUser 
};