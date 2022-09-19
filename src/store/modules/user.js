import axios from 'axios'
import qs from 'qs';

const state = {
    accessToken:null,
    refrechToken:null,
    user:null,
    loadingButton:false,
    loginMethod:null,
    registerData:null
};

const getters = {
    // getUserData: state => JSON.parse(state.user),
    getAccessToken: () => localStorage.getItem("accessToken"),
    getRefreshToken: () => localStorage.getItem("refreshToken"),
    getLoadingState : state => state.loadingButton,
    // getLoginMethod: state =>state.loginMethod,
    // getRegisterData: state =>state.registerData
};

const actions = {
    async authUser (_,credentials ){  
        console.log(credentials);
        return  await axios.post('login',qs.stringify(credentials),{ headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
    },

    // async editUser(_,userDataUpdated){
    //     const response = await axios.put(`users/${userDataUpdated[0]}`,userDataUpdated[1])
    //     localStorage.setItem('userData',JSON.stringify(response.data))
    //     // return response
    //     // console.log(response.data);
    // }, 
    // async atempRegisterData({commit},username){
    //     axios.get(`users?where=pseudo&value=${username}`).then(response=>{
    //     commit('SET_REGISTER_DATA',response.data[0])   

    //     })
    // },

    // async editPassword(_,userDataUpdated){
    //   axios.put(`users/${userDataUpdated[0]}`,userDataUpdated[1])
       
    // },
    
    attemptAccessToken ({commit}, accessToken){
        commit('SET_ACCESS_TOKEN', accessToken)
    },
     attemptRefreshToken ({commit}, refrechToken){
        commit('SET_REFRESH_TOKEN', refrechToken)
    },

    
    //  attemptUser ({commit}, user){
    //     commit('SET_USER', user)
    // },

    loadingState({commit}, loadingButton){
        commit('SET_LOADING_BUTTON', loadingButton)
    },

   

   

    
};

const mutations = {
    // SET_USER: (state, user) => state.user = user,
    SET_ACCESS_TOKEN: ( accessToken) => localStorage.setItem("accessToken",accessToken),
    SET_REFRESH_TOKEN: (  refrechToken) => localStorage.setItem("accessToken",refrechToken),
    SET_LOADING_BUTTON: (state, loadingButton) => state.loadingButton = loadingButton,
    // SET_LOGIN_METHOD: (state, loginMethod) => state.loginMethod = loginMethod,
    // SET_REGISTER_DATA: (state, registerData) => state.registerData = registerData,
};

export default {
    state, getters, actions, mutations
}