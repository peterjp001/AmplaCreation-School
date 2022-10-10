<script>
import ModalContainer from "@/components/modal/ModalContainer.vue";
import ModalOpenButton from "@/components/modal/ModalOpenButton.vue";
import ModalHeader from "@/components/modal/ModalHeader.vue";
import ModalBody from "@/components/modal/ModalBody.vue";
import ModalFooter from "@/components/modal/ModalFooter.vue";
import ModalDialog from "@/components/modal/ModalDialog.vue";
import SubmitButton from "./button/SubmitButton.vue";
import { NotyfMessage } from "../utilities";
import { reactive } from "vue";
import { getTeachersForCourse } from "../httpRequest/courseRequest";
export default {
  components: {
    ModalContainer,
    ModalOpenButton,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalDialog,
    SubmitButton,
  },
  props: ["gradeData"],
  setup(props) {
    const gData = reactive(props.gradeData);

    const form = reactive([
      { courseName: null, teacherName: null, timeStart: null, timeEnd: null },
    ]);

    const grade = reactive({ gradeName: null });

    let teachers = reactive([]);

    const addCourse = () => {
      form.push({ courseName: null, teacherName: null, timeStart: null, timeEnd: null });
    };

    const removeCourse = (index) => {
      if (form.length > 1) form.splice(index, 1);
    };

    const saveGrade = () => {
      for (let i = 0; i < form.length; i++) {
        let item = form[i];
        if (
          item.courseName == null ||
          item.teacherName == null ||
          item.timeStart == null ||
          item.timeEnd == null
        ) {
          NotyfMessage("no", "danger");
        } else {
          NotyfMessage("yes", "success");
        }
      }
      console.log({ grade: gData.gradeName, courses: form });
    };

    const setCourse = (event, idForm) => {
      getTeachersForCourse(event.target.value)
        .then((res) => {
          if (res.data.length > 0) {
            teachers[idForm] = res.data;
          } else {
            teachers[idForm] = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(gData);
    };

    const setTeacher = (event) => {
      console.log(event.target.value);
    };

    return {
      form,
      grade,
      teachers,
      setCourse,
      addCourse,
      removeCourse,
      saveGrade,
      setTeacher,
    };
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
    <ModalOpenButton class="btn btn-sm btn-primary mx-1" modalAction="addCourse">
      <i class="bi bi-plus-circle"></i> Ajouter Cours
    </ModalOpenButton>
    <ModalContainer modalAction="addCourse">
      <ModalDialog class="modal-lg modal-dialog-scrollable">
        <ModalHeader>
          <div class="d-flex sticky-top">
            <button class="btn btn-sm btn-primary" @click="addCourse">
              <i class="bi bi-plus"></i> Ajouter
            </button>
          </div>
        </ModalHeader>
        <ModalBody>
          <div class="mb-3">
            <form v-for="(item, index) in form" :key="item.id">
              <div class="row border p-2 my-2">
                <div class="col-3">
                  <label for="" class="form-label">Cours</label>
                  <select
                    class="form-select"
                    @change="setCourse($event, index)"
                    v-model="item.courseName"
                  >
                    <option
                      v-for="course in this.getListCourses"
                      :key="course.id"
                      :value="course.courseName"
                    >
                      {{ course.courseName }}
                    </option>
                  </select>
                </div>
                <div class="col-4">
                  <label for="" class="form-label">Professeur</label>
                  <select
                    class="form-select"
                    @change="setTeacher($event)"
                    v-model="item.teacherName"
                  >
                    <option
                      v-for="teacher in teachers[index]"
                      :key="teacher.id"
                      :value="teacher.codeEmployee"
                    >
                      {{ teacher.firstName }} {{ teacher.lastName }}
                    </option>
                  </select>
                </div>
                <div class="col-2">
                  <label for="" class="form-label">Heure Debut</label>
                  <input type="time" class="form-control" v-model="item.timeStart" />
                </div>
                <div class="col-2">
                  <label for="" class="form-label">Heure Fin</label>
                  <input type="time" class="form-control" v-model="item.timeEnd" />
                </div>
                <div class="col-1 p-2">
                  <div class="pt-4">
                    <button
                      class="btn btn-sm btn-danger"
                      @click.prevent="removeCourse(index)"
                    >
                      <i class="bi bi-x-circle"></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </ModalBody>
        <ModalFooter>
          <SubmitButton name="Enregistrer" class="btn btn-primary" @click="saveGrade" />
        </ModalFooter>
      </ModalDialog>
    </ModalContainer>
  </div>
</template>
