import axios from 'axios';

const  newStudent = await function(data) { return  axios.post(`students/register`, data)}
const  allStudentsByAcademicYear = await function(id) { return  axios.get(`students/register/all/${id}`)}
const  studentByIdAndAcademicYear = await function(studentId,academicYearId) { return  axios.get(`/students/register/student/${studentId}/academicyear/${academicYearId}`)}



export {  
    allStudentsByAcademicYear,studentByIdAndAcademicYear,newStudent
};