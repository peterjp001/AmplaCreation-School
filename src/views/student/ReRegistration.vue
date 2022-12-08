<script>
import Navbar from "@/components/NavBar.vue";
import Offcanvas from "@/components/OffCanvas.vue";
import Titlebar from "@/components/TitleBar.vue";

import { studentByStudentCode } from "../../httpRequest/studentRequest";

export default {
  components: { Navbar, Offcanvas, Titlebar },
  data() {
    return {code:null, error:null, studentData:null};
  },
  computed: {
    getCData() {
      return this.$store.getters.getCardData;
    },
  },
  methods:{
    searchStudent(){
      studentByStudentCode(this.code).then((res) => {
        if(this.error) this.error=null;
        this.studentData = res.data
        
      }).catch(err=>{
        if(this.studentData) this.studentData=null;
        this.error = err.response.data.errorMessage
      }) 
    }
  }
};
</script>

<template>
  <div>
    <Navbar />

    <Offcanvas />

    <main class="mt-5">
      <div class="container-fluid">
        <Titlebar title="Réinscription" />

        <div class="row row-cols-12 mt-4">
          <div class="col ">
            <!-- <ModalAddStudentVue /> -->
            <RouterLink to="student/new" class="btn btn-sm btn-primary me-2"> <i class="bi bi-person-plus"></i> Inscrption</RouterLink>
            <RouterLink to="student" class="btn btn-sm btn-primary"> <i class="bi bi-list"></i> Liste élèves</RouterLink>
          </div>
        </div>

        <div class="row row-cols-1 m-0 card shadow mt-2">
          <div class="col-sm-6 p-2 py-4">
            <form  v-on:submit.prevent="searchStudent">
              <div class="input-group mb-3">
                <input type="text" v-model="code" class="form-control" placeholder="Rechercher un élève par son code"  >
                <button class="btn btn-primary" :disabled="this.code==null || this.code.trim() == ''" type="submit" id="button-addon2">Recherche</button>
              </div>
            </form>
          </div>
        </div>

        <div class="row row-cols-12 m-0 card shadow mt-2">
          <div class="col p-2 py-4" v-if="this.studentData">
           {{this.studentData}}
          </div>
          <div class="col-lg-12 p-2 py-4  " v-if="this.error">
            <p class=" text-center text-danger fw-bold lead">{{this.error}}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
