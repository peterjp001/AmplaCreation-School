// import axios from 'axios'
import { allGrades,getGrade } from "../../httpRequest/gradeRequest";


const state = { 
    listGrades:[],
    grade:null
};

const getters = {
    getListGrades:   state => state.listGrades, 
    getGrade:   state => state.grade, 
};

const actions = {

    async fetchGrades ({commit}){
        allGrades().then(response => { 
        commit('SET_LIST_GRADES', response.data)
        });
    },
    async fetchGrade ({commit},id){
        getGrade(id).then(response => { 
        commit('SET_GRADE', response.data)
        });
    },

 
    
 
};

const mutations = { 
    SET_LIST_GRADES: (state, listGrades) => state.listGrades = listGrades, 
    SET_GRADE: (state, grade) => state.grade = grade, 
};

export default {
    state, getters, actions, mutations
}