<script>
import Navbar from "@/components/NavBar.vue";
import Offcanvas from "@/components/OffCanvas.vue";
import Titlebar from "@/components/TitleBar.vue"; 

export default {
  props:['register_id'],
  components: { Navbar, Offcanvas, Titlebar,  },
  data() {
    return { navInfo: true, navAy: false };
  },
  computed: {
    getStudent(){
      return this.$store.getters.getStudent;
    }
  },
  methods: {
    toggleNav(nav) {
      if (nav == "emp") {
        this.navInfo = !this.navInfo;
        this.navAy = !this.navAy;
      } else {
        this.navInfo = !this.navInfo;
        this.navAy = !this.navAy;
      }
    },
  },
  mounted() {
   console.log(localStorage.getItem("academicYear"));
      this.$store.dispatch('fetchStudent',  {studentId:this.register_id,academicYearId: localStorage.getItem("academicYear")})
 
  },
 
};
</script>

<template>
  <div>
    <Navbar />

    <Offcanvas />

    <main class="mt-5" >
      <div class="container-fluid" v-if="this.getStudent">
        <Titlebar title="Informations sur l'élève " />

            <section >
              <div class="container py-5">
                
                <div class="row">

                  <div class="col-lg-4">

                    <div class="card mb-4">
                      <div class="card-body text-center">
                        <img src="../assets/images/acc-avatar.PNG" alt="avatar"
                          class="rounded-circle img-fluid" style="width: 150px;">
                        <h5 class="my-3">{{this.getStudent.student.lastName.toUpperCase()}} {{this.getStudent.student.firstName}}</h5>
                        <p class="text-muted mb-1">{{this.getStudent.student.codeStudent}}</p>
                        <p class="text-muted mb-4">{{this.getStudent.gradeName}}</p>
                        {{this.getStudent.student}}
                       
                      </div>
                    </div>
                    
                  </div>

                  <div class="col-lg-8">
                    <div class="card mb-4">
                      <div class="card-body">
                        <p class="mb-4">
                          <span class="text-primary lead font-italic fw-bold me-1 border-bottom">Informations Personnelles</span>
                         </p>
                        <div class="row">

                          <div class="col-sm-4">
                            <table class="table table-striped">
                              <tbody class="table-group-divider">
                                <tr>
                                  <th scope="row">Code: </th>
                                  <td>{{this.getStudent.student.codeStudent}}</td> 
                                </tr>
                                <tr>
                                  <th scope="row">Nom: </th>
                                  <td>{{this.getStudent.student.lastName}}</td> 
                                </tr>
                                <tr>
                                  <th scope="row">Prénom: </th>
                                  <td>{{this.getStudent.student.firstName}}</td> 
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div class="col-sm-4">
                            <table class="table table-striped">
                              <tbody class="table-group-divider">
                                <tr>
                                  <th scope="row">Adresse: </th>
                                  <td>{{this.getStudent.student.address}}</td> 
                                </tr>
                                <tr>
                                  <th scope="row">Date Naissance: </th>
                                  <td>{{this.getStudent.student.birthDate}}</td> 
                                </tr>
                                <tr>
                                  <th scope="row">Lieu Naissance: </th>
                                  <td colspan="2">{{this.getStudent.student.birthPlace}}</td> 
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div class="col-sm-4">
                            <table class="table table-striped">
                              <tbody class="table-group-divider">
                                <tr>
                                  <th scope="row">Sexe: </th>
                                  <td colspan="2">{{this.getStudent.student.sexe.toUpperCase()}}</td> 
                                </tr> 
                              </tbody>
                            </table>
                          </div>

                        </div>
                      </div>
                    </div>

                    <div class="card mb-4">
                      <div class="card-body">
                        <p class="mb-4">
                          <span class="text-primary lead font-italic fw-bold me-1 border-bottom">Parents & Personnes Responsable</span>
                         </p>
                        <div class="row">
                          <div class="col-sm-6">
                            <table class="table table-striped">
                              <tbody class="table-group-divider">
                                <tr>
                                  <th scope="row">Père: </th>
                                  <td colspan="2">{{this.getStudent.student.fatherFullName}}</td> 
                                </tr> 
                                <tr>
                                  <th scope="row">Sexe: </th>
                                  <td colspan="2">{{this.getStudent.student.motherFullName}}</td> 
                                </tr> 
                                <tr>
                                  <th scope="row">Personne Responsable: </th>
                                  <td colspan="2">{{this.getStudent.student.responsiblePersonFullName}}</td> 
                                </tr> 
                              </tbody>
                            </table>
                          </div>
                          <div class="col-sm-6">
                            <table class="table table-striped">
                              <tbody class="table-group-divider">
                                <tr>
                                  <th scope="row">Téléphone Responsable: </th>
                                  <td colspan="2">{{this.getStudent.student.responsiblePersonPhone}}</td> 
                                </tr> 
                                <tr>
                                  <th scope="row">Adresse Responsable: </th>
                                  <td colspan="2">{{this.getStudent.student.responsiblePersonAddress}}</td> 
                                </tr>  
                              </tbody>
                            </table>
                          </div>

                        </div>
                      </div>
                    </div>
                    
                    <div class="card mb-4">
                      <div class="card-body">
                        <p class="mb-4">
                          <span class="text-primary lead font-italic fw-bold me-1 border-bottom">Informations Académique</span>
                         </p>
                        <div class="row"> 
                          <div class="col-sm-4">
                            <table class="table table-striped">
                              <tbody class="table-group-divider">
                                <tr>
                                  <th scope="row">Sexe: </th>
                                  <td colspan="2">{{this.getStudent.student.sexe.toUpperCase()}}</td> 
                                </tr> 
                              </tbody>
                            </table>
                          </div>

                        </div>
                      </div>
                    </div>

                     
                    
                  </div>
                </div>
              </div>
            </section>
       
      </div>
    </main>
  </div>
</template>

<style scope>
.nav-link.x {
  color: black !important;
}
</style>
