// import axios from 'axios'
import { allStudentsByAcademicYear,allStudents,studentByStudentIdAndAcademicYear,studentByStudentId } from "../../httpRequest/studentRequest"; 

const state = { 
    listStudents:[],
    students:[],
    studentRegister:null,
    student:null
    
};

const getters = {
    getListStudents:   state => state.listStudents,
    getStudentRegister: state =>    state.studentRegister,
    getStudents: state =>    state.students,
    getStudent: state =>    state.student,
      
};

const actions = {

    async fetchStudentsByAcademicYear ({commit}, id){
        allStudentsByAcademicYear(id).then(response => { 
        commit('SET_LIST_STUDENTS', response.data)
        });
    },

    async fetchStudents ({commit}, ){
        allStudents().then(response => { 
        commit('SET_STUDENTS', response.data)
        });
    },
    async fetchStudentByStudentId ({commit}, id){
        studentByStudentId(id).then(response => { 
        commit('SET_STUDENT', response.data)
        });
    },
    
    async fetchStudentByStudentIdAndAyId ({commit}, {studentId, academicYearId}){
        studentByStudentIdAndAcademicYear(studentId, academicYearId).then(response => { 
            if(response.data ){
                commit('SET_STUDENT_REGISTER', response.data)
            }
        }).catch(()=>{
            console.log("err");
        });
    },

};

const mutations = { 
    SET_LIST_STUDENTS: (state, listStudents) => state.listStudents = listStudents,
    SET_STUDENT_REGISTER: (state, studentRegister)=> state.studentRegister = studentRegister,
    SET_STUDENTS: (state, students)=> state.students = students,
    SET_STUDENT: (state, student)=> state.student = student
};

export default {
    state, getters, actions, mutations
}