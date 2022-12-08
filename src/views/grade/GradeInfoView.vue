<script>
import Navbar from "@/components/NavBar.vue";
import Offcanvas from "@/components/OffCanvas.vue";
import Titlebar from "@/components/TitleBar.vue";
import ModalAddCourseToGrade from "@/components/ModalAddCourseToGrade.vue";
import ModalConfirmDeleteGradeRegistry from "../../components/ModalConfirmDeleteGradeRegistry.vue";

// import ModalEditCourseGrade from "@/components/ModalEditCourseGrade.vue";
export default {
  props: ["grade_id"],
  components: { Navbar, Offcanvas, Titlebar,ModalAddCourseToGrade,   ModalConfirmDeleteGradeRegistry },
  data() {
    return {};
  },
  computed: {
    getGradeRegistries() {
      return this.$store.getters.getListGradeRegistry;
    },
    getGrade() {
      return this.$store.getters.getGrade;
    },
  },
 
  mounted() {
    this.$store.dispatch('fetchGrade', this.grade_id);
    this.$store.dispatch("fetchGradeRegistryByIdGrade", {gradeId:this.grade_id,academicYearId:localStorage.getItem('academicYear')});
  },
};
</script>

<template>
  <div v-if="(this.getGradeRegistries && this.getGrade)">
    <Navbar />

    <Offcanvas />

    <main class="mt-5">
      <div class="container-fluid">
        <Titlebar :title="`Planification Classe: ${this.getGrade.gradeName} `" />

        <div class="row row-cols-12 mt-4">
          <div class="col">
            <ModalAddCourseToGrade :gradeData="this.getGrade" />  
          </div>
        </div> 
        <div class="row row-cols-12 mt-3">
          <div class="col pb-2">
            <div class="card shadow">
              <div class="card-header acc-bg d-flex justify-content-between">
                <span>Liste Cours</span>
              </div>
              <div class="card-body">
                <table
                  id="example"
                  class="table table-striped nowrap"
                  style="width: 100%"
                >
                  <thead>
                    <tr>
                    
                      <th>Cours</th>
                      <th>Professeur</th>
                      <th>Jour</th>
                      <th>Horraires</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in this.getGradeRegistries" :key="item.id">
                      <td>{{item.course.courseName}}</td>
                      <td>{{item.employee.firstName}} {{item.employee.lastName}}</td>
                      <td>{{item.day}}</td>
                      <td>{{item.timeStart}} - {{item.timeEnd}}</td>
                      <td>
                        <RouterLink :to="`/grade-course/${item.id}`" class="btn btn-sm btn-primary me-1" >
                            <i class="bi bi-pen"> </i> 
                            Modifier Cours 
                        </RouterLink>
                        <ModalConfirmDeleteGradeRegistry :gradeRegistryData="item" /> 
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
