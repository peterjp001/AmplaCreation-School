// import axios from 'axios'
import { allAcademicYear } from "../../httpRequest/academicYearRequest";


const state = {
    academicYear:null,
    listAcademicYears:[]
};

const getters = {
    getListAcademicYear:   state => state.listAcademicYears, 
    getAcademicYear:   state =>  state.academicYear, 
};

const actions = {

    async fetchAcademicYears ({commit}){
        allAcademicYear().then(response => { 
        commit('SET_LIST_ACADEMIC_YEAR', response.data)
        });
    },

    async reSetAcademicYear ({commit},ay){ 
        commit('SET_ACADEMIC_YEAR', ay) 
    },

    
 
};

const mutations = { 
    SET_LIST_ACADEMIC_YEAR: (state, listAcademicYears) => state.listAcademicYears = listAcademicYears,
    SET_ACADEMIC_YEAR: (state, academicYear) => state.academicYear = academicYear
};

export default {
    state, getters, actions, mutations
}