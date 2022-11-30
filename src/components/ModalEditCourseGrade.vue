<script>
import ModalContainer from "@/components/modal/ModalContainer.vue";
import ModalOpenButton from "@/components/modal/ModalOpenButton.vue";
import ModalHeader from "@/components/modal/ModalHeader.vue";
import ModalBody from "@/components/modal/ModalBody.vue";
import ModalFooter from "@/components/modal/ModalFooter.vue";
import ModalDialog from "@/components/modal/ModalDialog.vue";
import SubmitButton from "@/components/button/SubmitButton.vue";  
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
  props:['gradeRegistryData'],
  data() {
    return { teachers:[], currentEmployee:{}, courseName:null, codeEmployee:null, timeStart:null, timeEnd:null };
  },
  

  methods: {
     setCourse(event)  {
      this.courseName = event.target.value;
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

    setTeacher(event){
          console.log(event.target.value);
    },

    updateCourseRegistry(){
      console.log({ 
        gradeRegistry: this.gradeRegistryData.id,
        courseName: this.courseName, 
        codeEmployee: this.codeEmployee, 
        timeStart: this.timeStart, 
        timeEnd: this.timeEnd 
      });
    },

    
  },
  computed: {
    
    getListCourses() {
      return this.$store.getters.getListCourses;
    },
  },
  mounted() {
    this.$store.dispatch("fetchCourses");
   
    getTeachersForCourse(this.gradeRegistryData.course.courseName)
        .then((res) => { 
          if (res.data.length > 0) { 
            res.data.forEach(emp => {
              if(emp.codeEmployee == this.gradeRegistryData.employee.codeEmployee)
              this.currentEmployee = emp;
              this.codeEmployee = emp.codeEmployee;
            });
            this.teachers = res.data;
          } else {
            this.teachers = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    
  },

};
</script>

<template>
  <div>

    <ModalOpenButton class="btn btn-sm btn-primary mx-1"  :modalAction="'ok'+this.gradeRegistryData.id">
      <span class="bi bi-pen"></span>
      <span> Modifier</span>
    </ModalOpenButton>


    <ModalContainer :modalAction="'ok'+this.gradeRegistryData.id">
      <ModalDialog>
        <ModalHeader title="Modifier Cours" />
        <ModalBody>
     <!-- {{this.gradeRegistryData.course.courseName }}
     {{this.gradeRegistryData.employee.codeEmployee }}
     {{this.gradeRegistryData.timeStart }}
     {{this.gradeRegistryData.timeEnd }}
     {{this.gradeRegistryData.academicYear.id }}
     {{this.gradeRegistryData.gradeId }} -->
      
          <div class="mb-3">
              <label for="" class="form-label">Cours</label>
              <select
                class="form-select"
                @change="setCourse($event)"  
              >
                <option
                  v-for="course in this.getListCourses"
                  :key="course.id"
                  :value="course.courseName"
                  :selected="course.name == this.gradeRegistryData.course.courseName"
                >
                  {{ course.courseName }}
                </option>
              </select>
          </div>
          <div class="mb-3">
              <label for="" class="form-label">Professeur</label>
              <select
                class="form-select" 
                @change="setTeacher($event)"  
              >
                <option
                  v-for="teacher in teachers"
                  :key="teacher.id"
                  :value="teacher.codeEmployee"
                  :selected="teacher.codeEmployee == this.currentEmployee.codeEmployee"
                >
                  {{ teacher.firstName }} {{ teacher.lastName }}
                </option>
              </select>
          </div>
          <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Heure Debut</label>
              <input type="time" class="form-control"  @input="(event) => (timeStart = event.target.value.trim())"  :value="this.gradeRegistryData.timeStart"> 
          </div>
          <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Heure Fin</label>
              <input type="time" class="form-control" @input="(event) => (timeEnd = event.target.value.trim())" :value="this.gradeRegistryData.timeEnd"> 
          </div>

           
        </ModalBody>
        <ModalFooter>
          <SubmitButton
            id="add"
            class="btn-primary"
            name="Sauvegarder"
            @click="updateCourseRegistry"
          />
        </ModalFooter>
      </ModalDialog>
    </ModalContainer>

  </div>
</template>
