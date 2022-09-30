import { allEmployees,getEmployee } from "../../httpRequest/employeeRequest";


const state = {
    listEmployees:[],
    employee:{}
};

const getters = {
    getListEmployees:   state => state.listEmployees,
    getEmployee:   state => state.employee,
};

const actions = {

    async fetchEmployees({commit}){
        allEmployees().then(response => { 
        commit('SET_LIST_EMPLOYEES', response.data)
        });
    },
    async fetchEmployee({commit},id){
        getEmployee(id).then(response => { 
        commit('SET_EMPLOYEE', response.data)
        });
    },
   
};

const mutations = { 
    SET_LIST_EMPLOYEES: (state, listEmployees) => state.listEmployees = listEmployees,
    SET_EMPLOYEE: (state, employee) => state.employee = employee,
};

export default {
    state, getters, actions, mutations
}