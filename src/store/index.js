import { createStore } from 'vuex'
 
import user from './modules/user' 
import course from './modules/course' 
import functions from './modules/function' 
import employee from './modules/employee' 
import AppComponentData from './modules/AppComponentData' 
import AcademicYear from './modules/AcademicYear' 
import grade from './modules/grade' 
import gradeRegistry from './modules/gradeRegistry' 
import student from './modules/student' 
import note from './modules/note' 

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
    user,AppComponentData,course,functions,employee,AcademicYear,grade,gradeRegistry,student,note
  },
})