// import axios from 'axios'
import { notesByAyAndGradeAndCourseAndPeriod } from "../../httpRequest/noteRequest";


const state = {
    listNotes:[]
};

const getters = {
    getListNotes:   state => state.listNotes, 
};

const actions = {

    async fetchNotesByAyAndGradeAndCourseAndPeriod ({commit},{ayId,gradeId,courseId}){
        notesByAyAndGradeAndCourseAndPeriod(ayId,gradeId,courseId).then(response => { 
        commit('SET_LIST_NOTES', response.data)
        });
    },

};

const mutations = { 
    SET_LIST_NOTES: (state, listNotes) => state.listNotes = listNotes, 
};

export default {
    state, getters, actions, mutations
}