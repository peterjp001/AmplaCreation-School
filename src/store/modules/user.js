import axios from 'axios'
import qs from 'qs';



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

    async authUser (_,credentials ){   
        return await axios.post('login',qs.stringify(credentials),{ headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
    },
 
  
    async fetchUsers ({commit}){
        axios.get("users", {
            headers: {Authorization: "Bearer " + localStorage.getItem("accessToken"),}
        })
        .then(response => {
        commit('SET_LIST_USERS', response.data)
        });
    },

    async fetchUser ({commit},id){
        axios.get(`user/${id}`, {
            headers: {Authorization: "Bearer " + localStorage.getItem("accessToken"),}
        })
        .then(response => {
        commit('SET_USER_INFO', response.data)
        });
    },

     async  addRoleToUser  (role,username) { return await  axios.post(`addroletouser/user/${username}/role/${role}`,this.getToken)},
    async  removeRoleToUser (role,username) { return await axios.post(`removeroletouser/user/${username}/role/${role}`,this.getToken)},


  
      
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