<script>
import Navbar from "@/components/NavBar.vue";
import Offcanvas from "@/components/OffCanvas.vue";
import Titlebar from "@/components/TitleBar.vue";
import ModalAddCourseToGrade from "@/components/ModalAddCourseToGrade.vue";
export default {
  props: ["grade_id"],
  components: { Navbar, Offcanvas, Titlebar, ModalAddCourseToGrade },
  data() {
    return {};
  },
  computed: {
    getGrade() {
      return this.$store.getters.getGrade;
    },
  },
  mounted() {
    this.$store.dispatch("fetchGrade", this.grade_id);
  },
};
</script>

<template>
  <div v-if="this.getGrade">
    <Navbar />

    <Offcanvas />

    <main class="mt-5">
      <div class="container-fluid">
        <Titlebar :title="`Classe: ${this.getGrade.gradeName}`" />

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
                      <th>Horraires</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Tiger</td>
                      <td>Nixon</td>
                      <td>System Architect</td>
                      <td>Edinburgh</td>
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
