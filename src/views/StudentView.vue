<script>
import Navbar from "@/components/NavBar.vue";
import Offcanvas from "@/components/OffCanvas.vue";
import Titlebar from "@/components/TitleBar.vue";
// import ModalAddStudentVue from "../components/ModalAddStudent.vue.vue";


export default {
  components: { Navbar, Offcanvas, Titlebar },
  data() {
    return {};
  },
  computed: {
    getStudents() { 
      return this.$store.getters.getListStudents;
    },
  },
  mounted() {
    this.$store.dispatch('fetchStudentsByAcademicYear', localStorage.getItem("academicYear"))

  },
};
</script>

<template>
  <div>
    <Navbar />

    <Offcanvas />
    <main class="mt-5">
      <div class="container-fluid">
        <Titlebar title="Élèves" />

        <div class="row row-cols-12 mt-4">
          <div class="col">
            <!-- <ModalAddStudentVue /> -->
            <RouterLink to="student/new" class="btn btn-sm btn-primary"> <i class="bi bi-person-plus"></i> Nouveau Eleve</RouterLink>
          </div>
        </div>

        <div class="row row-cols-12 mt-3">
              <div class="col pb-2">
                <div class="card shadow">
                  <div class="card-header acc-bg d-flex justify-content-between">
                    <span>Liste des élèves</span>
                  </div>
                  <div class="card-body">
                    <table
                      id="example"
                      class="table table-striped nowrap"
                      style="width: 100%"
                    >
                      <thead>
                        <tr>
                          <th>Nom</th>
                          <th>Prénom</th>
                          <th>Sexe</th>
                          <th>Classe</th>
                          <th>Adresse</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in this.getStudents" :key="item.id">
                          <td>{{item.student.firstName}}</td>
                          <td>{{item.student.lastName}}</td>
                          <td>{{item.student.sexe}}</td>
                          <td>{{item.gradeName}}</td>
                          <td>{{item.student.address}}</td>
                          <td>
                            <RouterLink
                            :to="`student/${item.registerId}`"
                            class="btn btn-sm btn-primary"
                            ><i class="bi bi-info-circle"> </i> Info Eleve </RouterLink>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

      </div>
    </main>
  </div>
</template>
