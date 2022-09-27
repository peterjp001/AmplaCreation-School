// import axios from 'axios'
import { allcourses } from "../../httpRequest/courseRequest";


const state = {
    listCourses:[]
};

const getters = {
    getListCourses:   state => state.listCourses,
    getCourse: state => state.listCourses.filter(course => course.done)
};

const actions = {

    async fetchCourses ({commit}){
        allcourses().then(response => { 
        commit('SET_LIST_COURSES', response.data)
        });
    },

    setCourseName ({commit},id,courseName) {
        commit('SET_COURSENAME',id, courseName)
      }
 
};

const mutations = { 
    SET_LIST_COURSES: (state, listCourses) => state.listCourses = listCourses,
    SET_COURSENAME(state,id,courseName) {   return state.listCourses[id].courseName = courseName}
};

export default {
    state, getters, actions, mutations
}