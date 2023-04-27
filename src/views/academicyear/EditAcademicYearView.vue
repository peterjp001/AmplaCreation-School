<script>
import Navbar from "@/components/NavBar.vue";
import Offcanvas from "@/components/OffCanvas.vue";
import Titlebar from "@/components/TitleBar.vue";

export default {
  props: ["academic_id"],
  components: { Navbar, Offcanvas, Titlebar },
  data() {
    return {};
  },
  computed: {
    getAy() {
      return this.$store.getters.getAcademicYear;
    },
  },
  mounted() {
    this.$store.dispatch("fetchAcademicYear", this.academic_id);
  },
};
</script>

<template>
  <div>
    <Navbar />

    <Offcanvas />

    <main class="mt-5">
      <div class="container-fluid">
        <Titlebar title="Classes" />

        <div class="card shadow mt-3 p-2">
          <div class="row row-cols-12 mt-2">
            <div class="col pb-2">{{ this.getAy }}</div>
          </div>
        </div>

        <div class="row row-cols-12 mt-3">
          <div class="col pb-2">
            <div class="card shadow">
              <div class="card-header acc-bg d-flex justify-content-between">
                <span>Title</span>
              </div>
              <div class="card-body">
                <table
                  id="example"
                  class="table table-striped nowrap"
                  style="width: 100%"
                >
                  <thead>
                    <tr>
                      <th>First name</th>
                      <th>Last name</th>
                      <th>Position</th>
                      <th>Office</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- <tr v-for="item in this.getAy.periods" :key="item.id">
                      <td>Tiger</td>
                      <td>Nixon</td>
                      <td>System Architect</td>
                      <td>Edinburgh</td>
                    </tr> -->
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
