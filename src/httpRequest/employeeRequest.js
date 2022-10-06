import axios from 'axios'; 
const  allEmployees = await function() { return  axios.get(`employees`)}
const  addEmployee = await function(data) { return  axios.post(`newEmployeeWithNoAccount`,data)}
const  addEmployeeAsTeacher = await function(data) { return  axios.post(`employeeasteacher`,data)}
const  getEmployee = await function(id) { return  axios.get(`employee/${id}`)}
const  updateEmployee = await function(id,data) { return  axios.put(`employee/${id}`,data)}
const  addFunctionToEmployee = await function(id,functionName) { return  axios.post(`addfunctiontoemployee/employee/${id}/function/${functionName}`)}
const  removeFunctionToEmployee = await function(id,functionName) { return  axios.post(`removefunctiontoemployee/employee/${id}/function/${functionName}`)}

export {  
    allEmployees, 
    addEmployee,
    addEmployeeAsTeacher, 
    getEmployee, 
    updateEmployee,
    addFunctionToEmployee,
    removeFunctionToEmployee
};