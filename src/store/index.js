import { createStore } from 'vuex'
 
import user from './modules/user' 
import course from './modules/course' 
import functions from './modules/function' 
import employee from './modules/employee' 
import AppComponentData from './modules/AppComponentData' 

export default createStore({
  state: {
  },
  getters:{
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user ,AppComponentData,course,functions,employee
  },
})