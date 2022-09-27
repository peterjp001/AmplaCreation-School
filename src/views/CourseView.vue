<script>
import Navbar from "@/components/NavBar.vue";
import Offcanvas from "@/components/OffCanvas.vue";
import Titlebar from "@/components/TitleBar.vue";
import ModalAddCourse from "@/components/ModalAddCourse.vue";
import ModalEditCourse from "@/components/ModalEditCourse.vue";

export default {
  components: { Navbar, Offcanvas, Titlebar, ModalAddCourse, ModalEditCourse },
  data() {
    return {};
  },
  computed: {
    getListCourses() {
      return this.$store.getters.getListCourses;
    },
  },
  mounted() {
    this.$store.dispatch("fetchCourses");
  },
};
</script>

<template>
  <div>
    <Navbar />

    <Offcanvas />

    <main class="mt-5">
      <div class="container-fluid">
        <Titlebar title="Cours" />

        <div class="card shadow mt-3 p-2">
          <div class="row row-cols-12 mt-2">
            <div class="col pb-2">
              <ModalAddCourse />
            </div>
          </div>
        </div>
        <div class="row row-cols-12 mt-2">
          <div class="col pb-2">
            <div class="card shadow">
              <div class="card-header acc-bg d-flex justify-content-between">
                <span>Liste des cours </span>
              </div>
              <div class="card-body">
                <table
                  id="example"
                  class="table table-striped text-center nowrap"
                  style="width: 100%"
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>USERNAME</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in this.getListCourses" :key="item.id">
                      <td>{{ item.id }}</td>
                      <td>{{ item.courseName }}</td>
                      <td><ModalEditCourse :courseData="item" /></td>
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
