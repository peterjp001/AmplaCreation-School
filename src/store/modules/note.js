// import axios from 'axios'
import { notesByAyAndGradeAndCourseAndPeriod } from "../../httpRequest/noteRequest";
import {NotyfMessage} from '../../utilities';


const state = {
    listNotes:[]
};

const getters = {
    getListNotes:   state => state.listNotes, 
};

const actions = {

    async fetchNotesByAyAndGradeAndCourseAndPeriod ({commit},{ayId,gradeId,courseId}){
        notesByAyAndGradeAndCourseAndPeriod(ayId,gradeId,courseId).then(response => { 
            if(response.data.length > 0)
                commit('SET_LIST_NOTES', response.data)
            else
                NotyfMessage("Aucun Resultat","danger")
        });
    },

};

const mutations = { 
    SET_LIST_NOTES: (state, listNotes) => state.listNotes = listNotes, 
};

export default {
    state, getters, actions, mutations
}