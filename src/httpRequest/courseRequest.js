import axios from 'axios';

const  allcourses = await function() { return  axios.get(`courses`)}
const  addCourse = await function(data) { return  axios.post(`course`,data)}
const  updateCourse = await function(id,data) { return  axios.put(`course/${id}`,data)}
const  getTeachersForCourse = await function(course) { return  axios.get(`teacher/${course}` )}


export {  
    allcourses, addCourse,updateCourse,getTeachersForCourse
};