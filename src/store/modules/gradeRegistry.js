// import axios from 'axios'
import {  gradeRegistryById } from "../../httpRequest/gradeRegistryRequest";


const state = { 
    // listGrades:[],
    gradeRegistry:null
};

const getters = {
    // getListGrades:   state => state.listGrades, 
    getGradeRegistry:   state => state.gradeRegistry, 
};

const actions = {

    // async fetchGrades ({commit}){
    //     allGrades().then(response => { 
    //     commit('SET_LIST_GRADES', response.data)
    //     });
    // },
    // async fetchGradeRegistryByIdGrade ({commit},id){
    //     gradeRegistryByIdGrade(id).then(response => { 
    //     commit('SET_GRADE_REGISTRY_BY_GRADE_ID', response.data)
    //     });
    // },
    async fetchCourseRegistryById ({commit},id){
        gradeRegistryById(id).then(response => { 
        commit('SET_GRADE_REGISTRY_BY_ID', response.data)
        });
    },

 
    
 
};

const mutations = { 
    // SET_LIST_GRADES: (state, listGrades) => state.listGrades = listGrades, 
    // SET_GRADE_REGISTRY_BY_GRADE_ID: (state, gradeRegistry) => state.gradeRegistry = gradeRegistry, 
    SET_GRADE_REGISTRY_BY_ID: (state, gradeRegistry) => state.gradeRegistry = gradeRegistry, 
};

export default {
    state, getters, actions, mutations
}