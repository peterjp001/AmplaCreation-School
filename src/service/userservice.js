import axios from 'axios';
// const getHeaderAuthorization = {
//     headers: {Authorization: "Bearer " + localStorage.getItem("accessToken"),}
// }
const  deleteUser = await function(id) { return  axios.delete(`user/${id}`)}
const  addUser = await function(credentials) { return  axios.post(`user`,credentials)}
const  updateUser = await function(id,data) { return  axios.put(`user/${id}`,data)}
const  addRoleToUser = await function(role,username) { return  axios.post(`addroletouser/user/${username}/role/${role}`)}
const  removeRoleToUser = await function(role,username) { return  axios.post(`removeroletouser/user/${username}/role/${role}`)}


export { deleteUser, addUser, updateUser, addRoleToUser, removeRoleToUser };