import { allFunctions } from "../../httpRequest/functionRequest";


const state = {
    listFunctions:[]
};

const getters = {
    getListFunctions:   state => state.listFunctions,
};

const actions = {

    async fetchFunctions({commit}){
        allFunctions().then(response => { 
        commit('SET_LIST_FUNCTIONS', response.data)
        });
    },
   
};

const mutations = { 
    SET_LIST_FUNCTIONS: (state, listFunctions) => state.listFunctions = listFunctions,
};

export default {
    state, getters, actions, mutations
}