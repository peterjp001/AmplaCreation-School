import axios from 'axios';

const  allEmployees = await function() { return  axios.get(`employees`)}
const  addEmployee = await function(data) { return  axios.post(`newEmployeeWithNoAccount`,data)}
const  getEmployee = await function(id) { return  axios.get(`employee/${id}`)}

export {  
    allEmployees, addEmployee,getEmployee
};