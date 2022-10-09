import axios from 'axios';

const  allGrades = await function() { return  axios.get(`grades`)}
const  getGrade = await function(id) { return  axios.get(`grade/${id}`)}
const  addGrade = await function(data) { return  axios.post(`grade`,data)}
const  updateGrade = await function(id,data) { return  axios.put(`grade/${id}`,data)} 


export {  
    allGrades,getGrade, addGrade,updateGrade
};