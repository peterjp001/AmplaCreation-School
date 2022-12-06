// import axios from 'axios'


const state = {
    sideBarData : [
        {
            title:"Dashboard",
            icon:"bi bi-speedometer2",
            link:"/"
        },
        {
            title:"Élèves",
            icon:"bi bi-person-video",
            link:"/student"
        },
        {
            title:"Classes",
            icon:"bi bi-house",
            link:"/grade"
        },
        {
            title:"Cours",
            icon:"bi bi-journals",
            link:"/course"
        },
        {
            title:"Notes",
            icon:"bi bi-123",
            link:"/notes"
        },
        {
            title:"Employés / Fonctions",
            icon:"bi bi-people",
            link:"/employee",
            roleAccess:'ADMIN'
        },
        {
            title:"Utilisateurs",
            icon:"bi bi-person",
            link:"/users",
            roleAccess:'ADMIN'
        },
        {
            title:"Statistiques",
            icon:"bi bi-graph-up",
            link:"/statistiques"
        },
        {
            title:"Présence",
            icon:"bi bi-upc-scan",
            link:"/presence"
        },
        {
            title:"Année Académique",
            icon:"bi bi-calendar",
            link:"/academicyear"
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
    ],
    spinner:false
};

const getters = {
    getSideBarData: state => {
        return  state.sideBarData;
    },
    getCardData: state => {
        return  state.cardData;
    },
    getSpinnerState: state =>{
        return state.spinner;
    }
};

const actions = {
    //   setSideBarData ({commit}, sideBarData){
    //     commit('SET_SIDEBAR_DATA', sideBarData)
    // }

    spinnerState({commit}, loadingButton){
        commit('SET_LOADING_BUTTON', loadingButton)
    },
};

const mutations = {
    //  SET_SIDEBAR_DATA: (state, sideBarData) => state.sideBarData = sideBarData,
     SET_LOADING_BUTTON: (state, spinner) => state.spinner = spinner,
};

export default {
    state, getters, actions, mutations
}