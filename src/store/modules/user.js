 
import { allUsers,getUser } from '../../httpRequest/userRequest'; 



const state = {
    listUsers:{},
    userProfile:null,
    userInfo:null,
    loadingButton:false, 
    token:localStorage.getItem("accessToken")
};

const getters = {
    getUserProfile:   state => JSON.parse(state.userProfile), 
    getUserInfo:   state => state.userInfo, 
    getListUsers:   state => state.listUsers,
    getLoadingState : state => state.loadingButton,
    getToken: state=>state.token
};

const actions = {

    async fetchUsers ({commit}){
        allUsers().then(response => {
        commit('SET_LIST_USERS', response.data)
        });
    },

    async fetchUser ({commit},id){
        getUser(id).then(response => {
        commit('SET_USER_INFO', response.data)
        });
    },

      
    attemptUserProfile ({commit}, user){
        commit('SET_USER_PROFILE', user)
    },

 
    loadingState({commit}, loadingButton){
        commit('SET_LOADING_BUTTON', loadingButton)
    },


};

const mutations = {
    SET_USER_PROFILE: (state, userProfile) => state.userProfile = userProfile, 
    SET_USER_INFO: (state, userInfo) => state.userInfo = userInfo, 
    SET_LIST_USERS: (state, listUsers) => state.listUsers = listUsers,
    SET_LOADING_BUTTON: (state, loadingButton) => state.loadingButton = loadingButton
};

export default {
    state, getters, actions, mutations
}