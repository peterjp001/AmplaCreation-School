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
import { addGradeRegistry } from "../httpRequest/gradeRegistryRequest";
import { useStore } from 'vuex'
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
    const store = useStore()
    const gData = reactive(props.gradeData);

    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

    const form = reactive([
      { courseName: null, codeEmployee: null, day:null, timeStart: null, timeEnd: null },
    ]);

    const grade = reactive({ gradeName: null  });

    let teachers = reactive([]);

    const addCourse = () => {
      form.push({ courseName: null, codeEmployee: null, timeStart: null, timeEnd: null });
    };

    const removeCourse = (index) => {
      if (form.length > 1) form.splice(index, 1);
    };

    const saveGrade = () => { 
     let errorCount = 0;
      form.forEach(f=>{
        if(f.codeEmployee== null || f.courseName == null || f.timeEnd == null || f.timeStart == null || f.day == null) errorCount++;
      })

      if(errorCount > 0){
        NotyfMessage("Tous les champs sont requis!", "danger");
      }else{
        //  console.log({ gradeName: gData.gradeName, academicYearId: localStorage.getItem('academicYear'), courses:  form });
      addGradeRegistry({ gradeName: gData.gradeName, academicYearId: localStorage.getItem('academicYear'), listCourses: form })
      .then((res)=>{
        console.log(res);
        store.dispatch("fetchGrade", gData.id);
        NotyfMessage("Cours ajouté", "success");
        window.$("#addCourse").modal("hide");
      })
      .catch((err) => {
        NotyfMessage(err.response.data.errorMessage, "danger");
          console.log(err);
        });
      }
     
       
    };

    const setCourse = (event, idForm) => {
      getTeachersForCourse(event.target.value)
        .then((res) => {
          if (res.data.length > 0) {
            teachers[idForm] = res.data;
            form[idForm].codeEmployee=null
          } else {
            teachers[idForm] = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
      days
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
      <ModalDialog class="modal-xl modal-dialog-scrollable">
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
                <div class="col-2">
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
                <div class="col-3">
                  <label for="" class="form-label">Professeur</label>
                  <select
                    class="form-select"
                    @change="setTeacher($event)"
                    v-model="item.codeEmployee"
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
                      <label for="" class="form-label">Jours</label>
                      <select class="form-select  " v-model="item.day" id="">
                          <option v-for="day in days" :key="day.index" :value="day" >{{day}} </option> 
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
