<script>
import Navbar from "@/components/NavBar.vue";
import Offcanvas from "@/components/OffCanvas.vue";
import Titlebar from "@/components/TitleBar.vue";
import { addCourse, updateCourse } from "../../httpRequest/courseRequest";
import { NotyfMessage } from "../../utilities";

export default {
  components: { Navbar, Offcanvas, Titlebar },
  data() {
    return {
      showInputAddCourse: false,
      courseName: null,
      idCourse: null,
      showInputEditCourse: false,
    };
  },
  computed: {
    getCourses() {
      return this.$store.getters.getListCourses;
    },
  },
  methods: {
    saveCourse() {
      addCourse({ courseName: this.courseName }).then(() => {
        this.showInputAddCourse = false;
        this.courseName = null;
        NotyfMessage("Cours ajouté", "success");
        this.$store.dispatch("fetchCourses");
      });
    },
    toggleeditCourse(func) {
      this.showInputAddCourse = false;
      this.showInputEditCourse = true;
      this.courseName = func.courseName;
      this.idCourse = func.id;
    },
    editCourse() {
      updateCourse(this.idCourse, { courseName: this.courseName }).then(() => {
        this.showInputEditCourse = false;
        NotyfMessage("Cours Modifié", "success");
        this.$store.dispatch("fetchCourses");
        this.idCourse = null;
        this.courseName = null;
      });
    },

    cancelEditCourse() {
      this.showInputEditCourse = false;
      this.idCourse = null;
      this.courseName = null;
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

        <div class="container-fluid">
          <div class="mt-3">
            <button
              class="btn btn-sm btn-primary"
              v-if="!showInputAddCourse && !showInputEditCourse"
              @click="showInputAddCourse = !showInputAddCourse"
            >
              <i class="bi bi-plus"></i> Nouveau Cours
            </button>
            <div id="aaa" class="input-group mb-3 w-50" v-if="showInputAddCourse">
              <input
                type="text"
                class="form-control"
                placeholder="Nom du cours"
                @input="(event) => (courseName = event.target.value.trim())"
              />
              <button
                class="btn btn-primary"
                :disabled="this.courseName == null || this.courseName == ''"
                type="button"
                @click="saveCourse"
              >
                Enregistrer
              </button>
              <button
                class="btn btn-secondary"
                type="button"
                @click="showInputAddCourse = !showInputAddCourse"
              >
                cancel
              </button>
            </div>
            <div id="aaa" class="input-group mb-3 w-50" v-if="showInputEditCourse">
              <input
                type="text"
                class="form-control"
                placeholder="Fonction"
                :value="this.courseName"
                @input="(event) => (courseName = event.target.value.trim())"
              />
              <button
                class="btn btn-primary"
                :disabled="this.courseName == null || this.courseName == ''"
                type="button"
                @click="editCourse"
              >
                Modifier
              </button>
              <button class="btn btn-secondary" type="button" @click="cancelEditCourse">
                cancel
              </button>
            </div>
          </div>
          <div class="row row-cols-12 mt-2">
            <div class="col pb-2">
              <div class="card shadow">
                <div class="card-header acc-bg d-flex justify-content-between">
                  <span>Liste Cours</span>
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
                        <th>Cours</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in this.getCourses" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.courseName }}</td>
                        <td>
                          <button
                            class="btn btn-sm btn-primary"
                            @click="toggleeditCourse(item)"
                          >
                            <i class="bi bi-pen"></i> Modifier
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
