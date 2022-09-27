import axios from 'axios';

const  allcourses = await function() { return  axios.get(`courses`)}
const  addCourse = await function(data) { return  axios.post(`course`,data)}
const  updateCourse = await function(id,data) { return  axios.put(`course/${id}`,data)}


export {  
    allcourses, addCourse,updateCourse
};