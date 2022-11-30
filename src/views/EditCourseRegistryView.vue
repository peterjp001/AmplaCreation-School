<script>
import Navbar from "@/components/NavBar.vue";
import Offcanvas from "@/components/OffCanvas.vue";
import Titlebar from "@/components/TitleBar.vue";
import { getTeachersForCourse } from "../httpRequest/courseRequest";
import { updateGradeRegistryById} from "../httpRequest/gradeRegistryRequest";
import SubmitButton from "../components/button/SubmitButton.vue";
export default {
  props:['grade_registry_id'],
  components: { Navbar, Offcanvas, Titlebar, SubmitButton },
  data() {
    return {
      teachers:[], currentEmployee:{}, courseName:null, codeEmployee:null, timeStart:null, timeEnd:null
    };
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
      this.codeEmployee = event.target.value 
    },

    updateCourseRegistry(){
      updateGradeRegistryById(this.getGradeRegistryData.id,{  
        courseName: this.courseName, 
        codeEmployee: this.codeEmployee, 
        timeStart: this.timeStart, 
        timeEnd: this.timeEnd 
      }).then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
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
    this.$store.dispatch('fetchCourseRegistryById',this.grade_registry_id ); 

    // if (this.getGradeRegistry) {
    //   getTeachersForCourse(this.getGradeRegistry.course.courseName)
    //     .then((res) => { 
    //       console.log(res);
    //       if (res.data.length > 0) { 
    //         res.data.forEach(emp => {
    //           if(emp.codeEmployee == this.gradeRegistryData.employee.codeEmployee)
    //           this.currentEmployee = emp;
    //           this.codeEmployee = emp.codeEmployee;
    //         });
    //         this.teachers = res.data;
    //       } else {
    //         this.teachers = [];
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
    
  },
};
</script>

<template>
  <div>
    <Navbar />

    <Offcanvas />

    <main class="mt-5">
      <div class="container-fluid">

        <Titlebar title="Modifier Classe -> cours" />


        <div class="card shadow mt-3 p-2">
          <div class="row row-cols-12 mt-2" v-if="this.getGradeRegistryData" >
          
            <div class="col pb-2">
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
                      :selected="course.courseName == this.getGradeRegistryData.course.courseName" 
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
                  <option value=""></option>
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
                  <label for="exampleInputEmail1" class="form-label">Heure Debut</label>
                  <input type="time" class="form-control"  @input="(event) => (timeStart = event.target.value.trim())"   :value="this.getGradeRegistryData.timeStart"  > 
              </div>
              <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Heure Fin</label>
                  <input type="time" class="form-control" @input="(event) => (timeEnd = event.target.value.trim())" :value="this.getGradeRegistryData.timeEnd" > 
              </div>
              <div class="mb-3">
                <SubmitButton
            id="editGradeCourse"
            class="btn-primary"
            name="Sauvegarder"
            @click="updateCourseRegistry"
          />
              </div>
              
          </div>
          </div>
           
        </div>  
      </div>
    </main>
  </div>
</template>
