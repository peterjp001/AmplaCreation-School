import axios from 'axios';
 
const  addGradeRegistry = await function(data) { return  axios.post(`gradeRegistry`,data)} 
const  gradeRegistryByIdGrade = await function(id) { return  axios.get(`gradeRegistry/grade/${id}`,)} 
const  gradeRegistryById = await function(id) { return  axios.get(`gradeRegistry/${id}`,)} 
const  updateGradeRegistryById = await function(id, data) { return  axios.put(`gradeRegistry/${id}`,data)} 

export {  
    addGradeRegistry, gradeRegistryByIdGrade,gradeRegistryById,updateGradeRegistryById
};