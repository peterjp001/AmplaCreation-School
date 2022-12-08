<script>
import Navbar from "@/components/NavBar.vue";
import Offcanvas from "@/components/OffCanvas.vue";
import Titlebar from "@/components/TitleBar.vue";
import { newStudent } from "../../httpRequest/studentRequest"; 
import { NotyfMessage } from "../../utilities";


export default {
  components: { Navbar, Offcanvas, Titlebar },
  data() {
    return {
        firstName:null,
        lastName:null,
        address:null,
        sexe:null,
        birthDate:null,
        birthPlace:null,
        lastSchool:null,
        lastGrade:null,
        gradeName:null,
        motherFullName:null,
        fatherFullName:null,
        responsiblePersonFullName:null,
        responsiblePersonnePhone:null,
        responsiblePersonneAddress:null
    };
  },
  computed: {
    getGrades(){
      return this.$store.getters.getListGrades;
    }
    
  },
  methods: {
    saveStudent(){
      if( 
        this.lastName != null || this.lastSchool != null || this.address != null || this.responsiblePersonFullName != null ||
        this.sexe != null || this.lastGrade != null || this.birthDate != null || this.birthPlace != null || this.firstName != null ||
        this.responsiblePersonAddress != null || this.grade != null || this.motherFullName != null || this.responsiblePersonPhone != null || this.fatherFullName != null 
      ){
        if(
          this.lastName.trim() != '' || this.lastSchool .trim() != '' || this.address .trim() != '' || this.responsiblePersonFullName .trim() != '' ||
          this.sexe .trim() != '' || this.lastGrade .trim() != '' || this.birthDate .trim() != '' || this.birthPlace.trim() != '' || this.firstName .trim() != '' ||
          this.responsiblePersonAddress .trim() != '' || this.grade .trim() != '' || this.motherFullName .trim() != '' || this.responsiblePersonPhone .trim() != '' || this.fatherFullName .trim() != '' 
        ){
          console.log(this.lastName);
          newStudent({
            lastSchool: this.lastSchool,
            lastName: this.lastName,
            address: this.firstName,
            academicYearId: localStorage.getItem("academicYear"),
            responsiblePersonFullName: this.responsiblePersonFullName,
            sexe: this.sexe,
            lastGrade: this.lastGrade,
            birthDate: this.birthDate,
            birthPlace: this.birthPlace,
            firstName: this.firstName,
            responsiblePersonAddress: this.responsiblePersonneAddress,
            grade: this.gradeName,
            motherFullName: this.motherFullName, 
            responsiblePersonPhone: this.responsiblePersonnePhone,
            fatherFullName: this.fatherFullName
        }).then(()=>{
          NotyfMessage("Élève ajouté avec succès", "success");
        }).catch(err=>{
          console.log(err);
        })
        }else{
        NotyfMessage("Tout les champs son requis", "danger");
      }
      
      }else{
        NotyfMessage("Tout les champs son requis", "danger");
      }
     
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
        <Titlebar title="Nouveau élève" />

        <div class="  mt-3 p-2">
          <div class="row row-cols-12  ">
            <div class="col-4">
              <RouterLink to="/student" class="btn btn-sm btn-primary me-2"> <i class="bi bi-list"></i> Liste élèves</RouterLink>
              <RouterLink to="/re-registration" class="btn btn-sm btn-primary"> <i class="bi bi-person-plus"></i> Réinscription</RouterLink>

            </div>
          </div>
        </div> 
        <div class="card shadow mt-3 p-2"> 
            <form  v-on:submit.prevent="saveStudent">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 mt-2 g-3  ">
            <div class="col-lg-12 col-sm-12 col-12 fs-4 fw-bold">Informations Élèves</div>
              <div class="col">
                <label for="nom" class="form-label">Nom</label>
                <input type="text" class="form-control" id="nom" v-model.trim="lastName">
              </div>
              <div class="col">
                <label for="prenom" class="form-label">Prénom</label>
                <input type="text" class="form-control" id="prenom" v-model="firstName">
              </div>
              <div class="col">
                <label for="address" class="form-label">Adresse</label>
                <input type="text" class="form-control" id="address" v-model="address">
              </div>
              <div class="col">
              <label for="select-form">Sexe: </label> <br>
                <div class="btn-group" role="group"  >
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" v-model="sexe" id="masculin" value="masculin">
                    <label class="form-check-label" for="masculin">Masculin</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" v-model="sexe"  id="feminin" value="feminin">
                    <label class="form-check-label" for="feminin">Feminin</label>
                  </div> 
                </div>
              </div>

              <div class="col">
                <label for="birthDate" class="form-label">Date Naissance</label>
                <input type="date" class="form-control" id="birthDate" v-model="birthDate">
              </div>
              <div class="col">
                <label for="birthPlace" class="form-label">Lieu Naissance</label>
                <input type="text" class="form-control" id="birthPlace" v-model="birthPlace">
              </div>
              <div class="col">
                <label for="lastSchool" class="form-label">Dernière école fréquentée</label>
                <input type="text" class="form-control" id="lastSchool" v-model="lastSchool">
              </div>
              <div class="col">
                <label for="lastGrade" class="form-label">Dernière classe</label>
                <input type="text" class="form-control" id="lastGrade" v-model="lastGrade">
              </div>
              
              <div class=" col mb-3">
                <label for="" class="form-label">Classe Actuelle</label>
                <select class="form-select" v-model="gradeName">
                  <option selected>Selectionez une classe</option> 
                  <option  v-for="item in this.getGrades" :key="item.id" :value="item.gradeName">{{item.gradeName}}</option> 
                </select>
              </div>

            </div> <hr>
            <div  class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 mt-2 g-3 mt-2">
              <div class="col-lg-12 col-sm-12 col-12 fs-4 fw-bold">Parents & Personne Responsable</div>
              <div class="col">
                <label for="fullnameFather" class="form-label">Nom Complet Père</label>
                <input type="text" class="form-control" id="fullnameFather" v-model="fatherFullName">
              </div>
              <div class="col">
                <label for="fullnameMother" class="form-label">Nom Complet Père</label>
                <input type="text" class="form-control" id="fullnameMother" v-model="motherFullName">
              </div>
              <div class="col">
                <label for="responsiblePersonne" class="form-label">Nom Complet Personne Responsable</label>
                <input type="text" class="form-control" id="responsiblePersonne" v-model="responsiblePersonFullName">
              </div>
              <div class="col">
                <label for="responsiblePersonnePhone" class="form-label">Telephone Personne Responsable</label>
                <input type="text" class="form-control" id="responsiblePersonnePhone" v-model="responsiblePersonnePhone">
              </div>
              <div class="col">
                <label for="responsiblePersonneAddress" class="form-label">Adresse Personne Responsable</label>
                <input type="text" class="form-control" id="responsiblePersonneAddress" v-model="responsiblePersonneAddress">
              </div>
             
              </div>
           
              <div class=" mt-4">
                <button type="submit" class="btn btn-primary">Enregistrer</button>
              </div>
            </form> 
        </div>

        
      </div>
    </main>
  </div>
</template>
