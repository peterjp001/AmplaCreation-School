<script>
import Navbar from "@/components/NavBar.vue";
import Offcanvas from "@/components/OffCanvas.vue";
import Titlebar from "@/components/TitleBar.vue";
import { getTeachersForCourse } from "../../httpRequest/courseRequest";
import { updateGradeRegistryById } from "../../httpRequest/gradeRegistryRequest";
import SubmitButton from "../../components/button/SubmitButton.vue";
import { NotyfMessage } from "../../utilities";
export default {
  props: ["grade_registry_id"],
  components: { Navbar, Offcanvas, Titlebar, SubmitButton },
  data() {
    return {
      teachers: [],
      currentEmployee: {},
      courseName: null,
      codeEmployee: null,
      day: null,
      timeStart: null,
      timeEnd: null,
      days: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
    };
  },
  methods: {
    setCourse(event) {
      this.courseName = event.target.value;
      this.codeEmployee = null;
      getTeachersForCourse(event.target.value)
        .then((res) => {
          if (res.data.length > 0) {
            this.teachers = res.data;
          } else {
            this.teachers = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    setTeacher(event) {
      this.codeEmployee = event.target.value;
    },

    updateCourseRegistry() {
      updateGradeRegistryById(this.getGradeRegistryData.id, {
        academicYearId:localStorage.getItem("academicYear"),
        courseName: this.courseName,
        codeEmployee: this.codeEmployee,
        day: this.day,
        timeStart: this.timeStart,
        timeEnd: this.timeEnd,
      })
        .then(() => {
          NotyfMessage("Cours Modifié", "success");
          this.$store.dispatch("fetchCourseRegistryById", this.grade_registry_id);
        })
        .catch((err) => {
          NotyfMessage(err.response.data.errorMessage, "danger");
        });

    },
  },
  computed: {
    getCData() {
      return this.$store.getters.getCardData;
    },
    getGradeRegistryData() {
      return this.$store.getters.getGradeRegistry;
    },
    getListCourses() {
      return this.$store.getters.getListCourses;
    },
  },
  mounted() {
    this.$store.dispatch("fetchCourses");
    this.$store.dispatch("fetchCourseRegistryById", this.grade_registry_id);
  },
};
</script>

<template>
  <div>
    <Navbar />

    <Offcanvas />

    <main class="mt-5">
      <div class="container-fluid">
        <Titlebar title="Modifier cours" />

        <div class="mt-3 p-2">
          <div
            class="row mt-2 d-flex justify-content-center"
            v-if="this.getGradeRegistryData"
          >
            <div class="col-lg-5 p-3 card shadow">
              <table class="table">
                <tbody>
                  <tr>
                    <th scope="row">Cours:</th>
                    <td>{{ this.getGradeRegistryData.course.courseName }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Professeur:</th>
                    <td>
                      {{ this.getGradeRegistryData.employee.firstName }}
                      {{ this.getGradeRegistryData.employee.lastName.toUpperCase() }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Code Professeur:</th>
                    <td>{{ this.getGradeRegistryData.employee.codeEmployee }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Jour:</th>
                    <td>{{ this.getGradeRegistryData.day }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Heure Debut:</th>
                    <td>{{ this.getGradeRegistryData.timeStart }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Heure Fin:</th>
                    <td>{{ this.getGradeRegistryData.timeEnd }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="col-lg-5 p-4 card shadow">
              <div class="mb-4">
                <h5 class="text-center border-bottom fw-bold bg-primary text-light">
                  Entrez le(s) donné(es) a Modifier
                </h5>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Cours</label>
                <select class="form-select" @change="setCourse($event)">
                  <option>Selectionez un cours</option>
                  <option
                    v-for="course in this.getListCourses"
                    :key="course.id"
                    :value="course.courseName"
                  >
                    {{ course.courseName }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Professeur</label>
                <select class="form-select" @change="setTeacher($event)">
                  <option>Selecttionnez d'abord un cours</option>
                  <option
                    v-for="teacher in teachers"
                    :key="teacher.id"
                    :value="teacher.codeEmployee"
                  >
                    {{ teacher.firstName }} {{ teacher.lastName }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Jours</label>
                <select class="form-select" v-model="day" id="">
                  <option v-for="day in days" :key="day.index" :value="day">
                    {{ day }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="timeStart" class="form-label">Heure Debut</label>
                <input
                  type="time"
                  id="timeStart"
                  class="form-control"
                  @input="(event) => (timeStart = event.target.value.trim())"
                />
              </div>
              <div class="mb-3">
                <label for="timeEnd" class="form-label">Heure Fin</label>
                <input
                  type="time"
                  id="timeEnd"
                  class="form-control"
                  @input="(event) => (timeEnd = event.target.value.trim())"
                />
              </div>
              <div class="mb-3">
                <SubmitButton
                  id="editGradeCourse"
                  class="btn-primary"
                  name="Sauvegarder"
                  @click="updateCourseRegistry"
                  :disabled="
                    (this.courseName == null || this.codeEmployee == null) &&
                    this.timeStart == null &&
                    this.timeEnd == null &&
                    this.day == null
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
