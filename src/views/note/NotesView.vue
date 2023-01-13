<script>
import Navbar from "@/components/NavBar.vue";
import Offcanvas from "@/components/OffCanvas.vue";
import Titlebar from "@/components/TitleBar.vue";
import { getGradeRegistryByGradeIdAndAyId } from "../../httpRequest/gradeRegistryRequest";
import { NotyfMessage } from "../../utilities";
import ModalCreateUploadNotes from "../../components/ModalCreateUploadNotes.vue";

export default {
  components: { Navbar, Offcanvas, Titlebar, ModalCreateUploadNotes },
  data() {
    return {
      gradeIdSelected: null,
      listCourse: [],
      courseIdSelected: null,
    };
  },
  computed: {
    getListNotes() {
      return this.$store.getters.getListNotes;
    },
    getListGrades() {
      return this.$store.getters.getListGrades;
    },
  },
  methods: {
    setListCourse(gradeId) {
      if (gradeId) {
        this.gradeIdSelected = gradeId;
        getGradeRegistryByGradeIdAndAyId(
          gradeId,
          localStorage.getItem("academicYear")
        )
          .then((res) => {
            this.listCourse = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    searchNotes() {
      if (this.gradeIdSelected && this.courseIdSelected) {
        this.$store.dispatch("fetchNotesByAyAndGradeAndCourseAndPeriod", {
          ayId: localStorage.getItem("academicYear"),
          gradeId: this.gradeIdSelected,
          courseId: this.courseIdSelected,
        });
      } else {
        NotyfMessage("Veuillez remplir les options", "danger");
      }
    },
  },
  mounted() {
    this.$store.dispatch("fetchGrades");
  },
};
</script>

<template>
  <div>
    <Navbar />
    <Offcanvas />
    <main class="mt-5">
      <div class="container-fluid">
        <Titlebar title="Notes" />
        <div class="mt-3">
          <div class="d-flex">
            <div class="pb-2 me-4">
              <ModalCreateUploadNotes />
            </div>

            <div class="pb-2">
              <a
                href="../../../public/model_telechargement_note.xlsx"
                target="_blank"
                download="model_telechargement_notes"
                class="btn btn-sm btn-success"
              >
                <i class="bi bi-download"></i>
                Modèle Fichier téléchargement Notes
              </a>
            </div>
          </div>
        </div>
        <div class="card shadow mt-3 p-2">
          <div class="card-header d-flex justify-content-between">
            <span>Filter:</span>
          </div>
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4">
            <div class="col">
              <label for="" class="form-label">Classe</label>
              <select
                class="form-select"
                @change="
                  (e) => {
                    setListCourse(e.target.value);
                  }
                "
              >
                <option selected disabled>Select one</option>
                <option
                  v-for="grade in this.getListGrades"
                  :key="grade.id"
                  :value="grade.id"
                >
                  {{ grade.gradeName }}
                </option>
              </select>
            </div>
            <div class="col">
              <label for="" class="form-label">Cours</label>
              <select
                class="form-select form-select-md"
                @change="(e) => (courseIdSelected = e.target.value)"
                :disabled="listCourse.length === 0"
              >
                <option selected>Select one</option>
                <option
                  v-for="item in this.listCourse"
                  :key="item.course.id"
                  :value="item.course.id"
                >
                  {{ item.course.courseName }}
                </option>
              </select>
            </div>
            <div class="col">
              <label for="" class="form-label">Période</label>
              <select class="form-select form-select-md" name="" id="">
                <option selected>Select one</option>
                <option value="">New Delhi</option>
              </select>
            </div>
            <div class="col mt-2">
              <div class="mt-4">
                <button class="btn btn-md btn-primary" @click="searchNotes()">
                  <i class="bi bi-search"></i> Search
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="row row-cols-12 mt-3" v-if="this.getListNotes.length > 0">
          <div class="col pb-2">
            <div class="card shadow">
              <div class="card-header acc-bg d-flex justify-content-between">
                <span>Liste des Notes</span>
                <button class="btn btn-sm btn-light">
                  <i class="bi bi-save"></i> Généré Rapport
                </button>
              </div>
              <div class="card-body">
                <table
                  id="example"
                  class="table table-striped nowrap"
                  style="width: 100%"
                >
                  <thead>
                    <tr>
                      <th>Eleve</th>
                      <th>Professeur</th>
                      <th>Classe</th>
                      <th>Cours</th>
                      <th>Periode</th>
                      <th>Point</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in this.getListNotes" :key="item.id">
                      <td>
                        {{ item.studentFirstName }} {{ item.studentLastName }}
                      </td>
                      <td>
                        {{ item.employeeFirstName }} {{ item.employeeLastName }}
                      </td>
                      <td>{{ item.gradeName }}</td>
                      <td>{{ item.courseName }}</td>
                      <td>1</td>
                      <td>{{ parseFloat(item.point) }}</td>
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
