import axios from 'axios';

const  allFunctions = await function() { return axios.get(`functions`)}
const  addFunction = await function(data) { return axios.post(`function`,data)}
const  updateFunction = await function(id,data) { return axios.put(`function/${id}`,data)}


export {  
    allFunctions, addFunction,updateFunction
};