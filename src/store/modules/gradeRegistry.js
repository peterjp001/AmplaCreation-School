// import axios from 'axios'
import {  gradeRegistryById,getGradeRegistryByGradeIdAndAyId } from "../../httpRequest/gradeRegistryRequest";


const state = { 
    listGradeRegistry:[],
    gradeRegistry:null
};

const getters = {
    getListGradeRegistry:   state => state.listGradeRegistry, 
    getGradeRegistry:   state => state.gradeRegistry, 
};

const actions = {

    // async fetchGrades ({commit}){
    //     allGrades().then(response => { 
    //     commit('SET_LIST_GRADES', response.data)
    //     });
    // },
    async fetchGradeRegistryByIdGrade ({commit},{gradeId,academicYearId}){
        getGradeRegistryByGradeIdAndAyId(gradeId,academicYearId).then(response => { 
            if(response.data){

                commit('SET_GRADE_REGISTRY', response.data)
            }
        });
    },
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
    SET_GRADE_REGISTRY: (state, listGradeRegistry) => state.listGradeRegistry = listGradeRegistry, 
};

export default {
    state, getters, actions, mutations
}