// import axios from 'axios'
import { allStudentsByAcademicYear,studentByIdAndAcademicYear } from "../../httpRequest/studentRequest"; 

const state = { 
    listStudents:[],
    student:null
};

const getters = {
    getListStudents:   state => state.listStudents,
    getStudent: state =>    state.student
      
};

const actions = {

    async fetchStudentsByAcademicYear ({commit}, id){
        allStudentsByAcademicYear(id).then(response => { 
        commit('SET_LIST_STUDENTS', response.data)
        });
    },

    async fetchStudent ({commit}, {studentId, academicYearId}){
        studentByIdAndAcademicYear(studentId, academicYearId).then(response => { 
        commit('SET_STUDENT', response.data)
        });
    },

};

const mutations = { 
    SET_LIST_STUDENTS: (state, listStudents) => state.listStudents = listStudents,
    SET_STUDENT: (state, student)=> state.student = student
};

export default {
    state, getters, actions, mutations
}