import axios from 'axios';
 
const  addGradeRegistry = await function(data) { return  axios.post(`gradeRegistry`,data)} 
const  gradeRegistryByIdGrade = await function(id) { return  axios.get(`gradeRegistry/grade/${id}`)} 
const  gradeRegistryById = await function(id) { return  axios.get(`gradeRegistry/${id}`,)} 
const  getGradeRegistryByGradeIdAndAyId = await function(gradeId,academicYearId) { return  axios.get(`/gradeRegistry/grade/${gradeId}/academicyear/${academicYearId}`)} 
const  updateGradeRegistryById = await function(id, data) { return  axios.put(`gradeRegistry/${id}`,data)} 
// const  getGradeRegistryByGradeId = await function(id) { return  axios.get(`gradeRegistry/grade/${id}`)} 
const  deleteGradeRegistry = await function(id) { return  axios.delete(`gradeRegistry/${id}`)} 

export {  
    addGradeRegistry, 
    gradeRegistryByIdGrade,
    gradeRegistryById,
    updateGradeRegistryById,
    deleteGradeRegistry,
    getGradeRegistryByGradeIdAndAyId,
    // getGradeRegistryByGradeId
};