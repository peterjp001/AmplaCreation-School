// import axios from 'axios'


const state = {
    sideBarData : [
        {
            title:"Dashboard",
            icon:"bi bi-speedometer2",
            link:"/"
        },
        {
            title:"Users",
            icon:"bi bi-people",
            link:"/users"
        },
        {
            title:"Login",
            icon:"bi bi-people",
            link:"/login"
        }
    ],
    cardData:[
        {
            title:"titre1",
            icon:"bi bi-list-ul",
            link:"#",
            quantity: 0
        },
        {
            title:"titre2",
            icon:"bi bi-list-ul",
            link:"#",
            quantity: 1
        },
        {
            title:"titre3",
            icon:"bi bi-list-ul",
            link:"#",
            quantity: 2
        },
        {
            title:"titre4",
            icon:"bi bi-list-ul",
            link:"#",
            quantity: 3
        }
    ]
};

const getters = {
    getSideBarData: state => {
        return  state.sideBarData
    },
    getCardData: state => {
        return  state.cardData
    }
};

const actions = {
    //   setSideBarData ({commit}, sideBarData){
    //     commit('SET_SIDEBAR_DATA', sideBarData)
    // }
};

const mutations = {
    //  SET_SIDEBAR_DATA: (state, sideBarData) => state.sideBarData = sideBarData,
};

export default {
    state, getters, actions, mutations
}