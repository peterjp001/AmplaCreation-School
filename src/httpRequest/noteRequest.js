import axios from 'axios';

const  notesByAyAndGradeAndCourseAndPeriod = await function(ayId,gradeId,courseId) { return  axios.get(`/notes/academicyear/${ayId}/grade/${gradeId}/course/${courseId}`)} 


export {  
    notesByAyAndGradeAndCourseAndPeriod,
};