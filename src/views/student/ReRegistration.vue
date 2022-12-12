<script>
import Navbar from "@/components/NavBar.vue";
import Offcanvas from "@/components/OffCanvas.vue";
import Titlebar from "@/components/TitleBar.vue";

import { studentByStudentCode } from "../../httpRequest/studentRequest";

export default {
  components: { Navbar, Offcanvas, Titlebar },
  data() {
    return { code: null, 
      error: null, 
      studentData: null ,  
      gradeName:null,
    lastSchool:null,
    lastGrade:null
    };
  },
  computed: {
    getGrades(){
      return this.$store.getters.getListGrades;
    }
    
  },
  methods: {
    searchStudent() {
      studentByStudentCode(this.code)
        .then((res) => {
          if (this.error) this.error = null;
          this.studentData = res.data;
        })
        .catch((err) => {
          console.log(err.response.data.errorMessage);
          this.error = err.response.data.errorMessage;
          if (this.studentData) this.studentData = null;
        });
    },
    registerStudent(){
      console.log({
        studentId:this.studentData.id,
        academicYearId:localStorage.getItem('academicYear'),
        lastSchool:this.lastSchool,
        lastGrade:this.lastGrade,
        gradeName:this.gradeName
      });
    }
  },
  mounted() {
  this.$store.dispatch('fetchGrades')
 },
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
          <div class="col">
            <!-- <ModalAddStudentVue /> -->
            <RouterLink to="student/new" class="btn btn-sm btn-primary me-2">
              <i class="bi bi-person-plus"></i> Inscrption</RouterLink
            >
            <RouterLink to="student" class="btn btn-sm btn-primary">
              <i class="bi bi-list"></i> Liste élèves</RouterLink
            >
          </div>
        </div>

        <div class="row row-cols-1 m-0 card shadow mt-2">
          <div class="col-sm-6 p-2 py-4">
            <form v-on:submit.prevent="searchStudent">
              <div class="input-group mb-3">
                <input
                  type="text"
                  v-model="code"
                  class="form-control"
                  placeholder="Rechercher un élève par son code"
                />
                <button
                  class="btn btn-primary"
                  :disabled="this.code == null || this.code.trim() == ''"
                  type="submit"
                  id="button-addon2"
                >
                  Recherche
                </button>
              </div>
            </form>
          </div>
        </div>

        <div class="row m-0 card mt-4 p-3 text-center" v-if="this.error">
          <div class="col-lg-12 " >
          <h2 class="text-danger fw-bold lead">Erreur <i class="bi bi-exclamation-circle"></i></h2>
            <p class=" text-danger fw-bold lead">{{ this.error }}</p>
          </div>
        </div>

        <div class="row m-0 shadow mt-2" v-if="this.studentData">
          <div class=" p-2 py-4 col-sm-6 card">
              <p class="mb-4">
                <span class="text-primary lead font-italic fw-bold me-1 border-bottom"
                  >Informations de l'élève
                </span>
              </p>
              <table class="table table-striped">
                <tbody class="table-group-divider">
                  <tr>
                    <th scope="row">Code:</th>
                    <td>{{ this.studentData.codeStudent }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Nom:</th>
                    <td>{{ this.studentData.lastName }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Prénom:</th>
                    <td>{{ this.studentData.firstName }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Adresse:</th>
                    <td>{{ this.studentData.address }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Date Naissance:</th>
                    <td>{{ this.studentData.birthDate }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Lieu Naissance:</th>
                    <td colspan="2">{{ this.studentData.birthPlace }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Sexe:</th>
                    <td colspan="2">
                      {{ this.studentData.sexe.toUpperCase() }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Père:</th>
                    <td colspan="2">
                      {{ this.studentData.fatherFullName }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Mère:</th>
                    <td colspan="2">
                      {{ this.studentData.motherFullName }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Personne Responsable:</th>
                    <td colspan="2">
                      {{ this.studentData.responsiblePersonFullName }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Telephone Personne Responsable:</th>
                    <td colspan="2">
                      {{ this.studentData.responsiblePersonPhone }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Adresse Personne Responsable:</th>
                    <td colspan="2">
                      {{ this.studentData.responsiblePersonAddress }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-sm-6 py-4 card">
              <p class="mb-4">
                <span class="text-primary lead font-italic fw-bold me-1 border-bottom"
                  >Informations Académique
                </span>
              </p>
              <form v-on:submit.prevent="registerStudent">
                <div class="mb-3">
                  <label for="formGroupExampleInput" class="form-label"
                    >Dernière école</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="formGroupExampleInput" 
                    v-model="lastSchool"
                  />
                </div>
                <div class="mb-3">
                  <label for="formGroupExampleInput2" class="form-label"
                    >Dernière Classe</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="formGroupExampleInput2" 
                    v-model="lastGrade"
                  />
                </div>
                <div class=" col mb-3">
                <label for="" class="form-label">Classe Actuelle</label>
                <select class="form-select" v-model="gradeName">
                  <option selected>Selectionez une classe</option> 
                  <option  v-for="item in this.getGrades" :key="item.id" :value="item.gradeName">{{item.gradeName}}</option> 
                </select>
              </div>
              <div class="mb-3">
                 <button class="btn btn-primary" 
                 :disabled="
                 this.lastGrade == null || this.lastGrade.trim() == '' ||
                  this.lastSchool == null ||  this.lastSchool.trim() == '' ||
                 this.gradeName == null || this.gradeName.trim() == ''
                 "> Save</button>
                </div>
              </form> 
          </div>
          
        </div>
      </div>
    </main>
  </div>
</template>
