import axios from 'axios';

const  allStudents = await function() { return  axios.get(`students`)}
const  studentByStudentId = await function(id) { return  axios.get(`/students/${id}`)}
const  studentByStudentCode = await function(code) { return  axios.get(`/students/code/${code}`)}
const  updateStudent = await function(id,data) { return  axios.put(`/students/${id}`,data)}


const  newStudent = await function(data) { return  axios.post(`students/register`, data)}
const  newStudentForAcademicYear = await function(data) { return  axios.post(`/students/academic/register`, data)}
const  updateRegister = await function(id,data) { return  axios.put(`students/register/${id}`, data)}
const  allStudentsByAcademicYear = await function(id) { return  axios.get(`students/register/all/${id}`)}
const  studentByIdAndAcademicYear = await function(registerId,academicYearId) { return  axios.get(`/students/register/${registerId}/academicyear/${academicYearId}`)}
const  studentByStudentIdAndAcademicYear = await function(studentId,academicYearId) { return  axios.get(`/students/${studentId}/academicyear/${academicYearId}`)}


export {  
    allStudentsByAcademicYear,
    studentByIdAndAcademicYear,
    newStudent,
    newStudentForAcademicYear,
    allStudents,
    studentByStudentIdAndAcademicYear,
    studentByStudentId,
    updateStudent,
    updateRegister,
    studentByStudentCode
};