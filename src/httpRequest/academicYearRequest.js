import axios from 'axios';

const  allAcademicYear = await function() { return  axios.get(`academicyears`)}
const  getAcademicYear = await function(id) { return  axios.get(`academicyears/${id}`)}
const  addAcademicYear = await function(data) { return  axios.post(`academicyear`,data)}
const  updateAcademicYear = await function(id,data) { return  axios.put(`academicyear/${id}`,data)} 


export {  
    allAcademicYear, addAcademicYear,updateAcademicYear,getAcademicYear
};