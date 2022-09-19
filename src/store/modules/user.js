// import axios from 'axios'


const state = {
    token:null,
    user:null,
    loadingButton:false,
    loginMethod:null,
    registerData:null
};

const getters = {
    // getUserData: state => JSON.parse(state.user),
    // getToken: state => state.token,
    // getLoading : state => state.loadingButton,
    // getLoginMethod: state =>state.loginMethod,
    // getRegisterData: state =>state.registerData
};

const actions = {
    // async authUser (_,credentials ){
    //     const response = await axios.post('login',credentials)
    //     // console.log(response.data.user);
    //     localStorage.setItem('token',response.data.token)
    //     // console.log(response.data);
    //     localStorage.setItem('userData',JSON.stringify(response.data.user))
    //     return response
    // },

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
    
    //  attemptToken ({commit}, token){
    //     commit('SET_TOKEN', token)
    // },

    
    //  attemptUser ({commit}, user){
    //     commit('SET_USER', user)
    // },

    // loading({commit}, loadingButton){
    //     commit('SET_LOADING_BUTTON', loadingButton)
    // },

    // whatLoginMethod({commit},loginMethod){
    //     commit('SET_LOGIN_METHOD',loginMethod) 
    // },

   

    
};

const mutations = {
    // SET_USER: (state, user) => state.user = user,
    // SET_TOKEN: (state, token) => state.token = token,
    // SET_LOADING_BUTTON: (state, loadingButton) => state.loadingButton = loadingButton,
    // SET_LOGIN_METHOD: (state, loginMethod) => state.loginMethod = loginMethod,
    // SET_REGISTER_DATA: (state, registerData) => state.registerData = registerData,
};

export default {
    state, getters, actions, mutations
}