import axios from 'axios'
import qs from 'qs';

const state = {
    listUsers:{},
    userProfile:null,
    userInfo:null,
    loadingButton:false, 
};

const getters = {
    getUserProfile:   state => JSON.parse(state.userProfile), 
    getUserInfo:   state => state.userInfo, 
    getListUsers:   state => state.listUsers, 
    // getAccessToken: () => localStorage.getItem("accessToken"),
    // getRefreshToken: () => localStorage.getItem("refreshToken"),
    getLoadingState : state => state.loadingButton,
    // getLoginMethod: state =>state.loginMethod,
    // getRegisterData: state =>state.registerData
};

const actions = {

    async authUser (_,credentials ){   
        return await axios.post('login',qs.stringify(credentials),{ headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
    },
 
  
    async fetchUsers ({commit}){
        axios.get("users")
        .then(response => {
        commit('SET_LIST_USERS', response.data)
        }).catch(function (error) {
            console.log(error);
        });
    },

    async fetchUser ({commit},id){
        axios.get(`user/${id}`)
        .then(response => {
        commit('SET_USER_INFO', response.data)
        }).catch(function (error) {
            console.log(error);
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
    // SET_ACCESS_TOKEN: (state, accessToken) => state.accessToken = localStorage.setItem("accessToken",accessToken),
    // SET_REFRESH_TOKEN: (state,  refrechToken) =>state.refrechToken= localStorage.setItem("accessToken",refrechToken),
    SET_LOADING_BUTTON: (state, loadingButton) => state.loadingButton = loadingButton
};

export default {
    state, getters, actions, mutations
}