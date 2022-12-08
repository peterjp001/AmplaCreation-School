<script>
import ModalContainer from "@/components/modal/ModalContainer.vue";
import ModalOpenButton from "@/components/modal/ModalOpenButton.vue";
import ModalHeader from "@/components/modal/ModalHeader.vue";
import ModalBody from "@/components/modal/ModalBody.vue";
import ModalFooter from "@/components/modal/ModalFooter.vue";
import ModalDialog from "@/components/modal/ModalDialog.vue";
import SubmitButton from "./button/SubmitButton.vue";
import { NotyfMessage } from "../utilities";
import { updateRegister } from "../httpRequest/studentRequest";

export default {
  props: ["studentData","studentId"],
  components: {
    ModalContainer,
    ModalOpenButton,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalDialog,
    SubmitButton,
  },

  data() {
    return {
      lastSchool: null,
      lastGrade: null,
      gradeName: null,
    };
  },
  computed: {
    getGrades() {
      return this.$store.getters.getListGrades;
    },
  },
  methods: {
    setGrade(event) {
      this.gradeName = event.target.value;
      console.log(this.gradeName);
    },
    updateStudent() {
      if (this.lastSchool != null || this.lastGrade != null || this.gradeName != null) {
        // if(
        //    this.lastSchool .trim() != '' ||  this.lastGrade .trim() != ''   || this.grade .trim() != ''
        // ){

        // console.log({
        //   studentId: this.studentData.registerId,
        //   lastSchool: this.lastSchool,
        //   academicYearId: localStorage.getItem("academicYear"),
        //   lastGrade: this.lastGrade,
        //   gradeName: this.gradeName,
        // });

        updateRegister(this.studentData.registerId, {
          lastSchool: this.lastSchool,
          lastGrade: this.lastGrade,
          gradeName: this.gradeName,
        })
          .then(() => {
            this.$store.dispatch("fetchStudentByStudentIdAndAyId", {
              studentId: this.studentId,
              academicYearId: localStorage.getItem("academicYear"),
            });

            NotyfMessage("Information(s) modifié(es) avec succès", "success");
          })
          .catch((err) => {
            console.log(err);
          });
        //   }else{
        //   NotyfMessage("Tout les champs son requis!", "danger");
        // }
      } else {
        NotyfMessage("Rien a modifier", "danger");
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
    <ModalOpenButton
      class="btn btn-sm btn-primary mx-1"
      modalAction="editStudentAcademicInfo"
    >
      <i class="bi bi-pen"></i>
      <span> Modifier Info Academique</span>
    </ModalOpenButton>
    <ModalContainer modalAction="editStudentAcademicInfo">
      <ModalDialog class="modal-md">
        <ModalHeader title="Modifier Info Academique" />
        <ModalBody> 
          <form v-on:submit.prevent="saveStudent">
            <div class="row row-cols-1 mt-2">
              <div class="col">
                <label for="lastSchool" class="form-label"
                  >Dernière école fréquentée</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="lastSchool"
                  @input="(event) => (lastSchool = event.target.value.trim())"
                  :value="this.studentData.lastSchool"
                />
              </div>
              <div class="col">
                <label for="lastGrade" class="form-label">Dernière classe</label>
                <input
                  type="text"
                  class="form-control"
                  id="lastGrade"
                  @input="(event) => (lastGrade = event.target.value.trim())"
                  :value="this.studentData.lastGrade"
                />
              </div>

              <div class="col mb-3">
                <label for="" class="form-label">Classe Actuelle</label>
                <select class="form-select" @change="setGrade($event)">
                  <option selected>Selectionez une classe</option>
                  <option
                    v-for="item in this.getGrades"
                    :key="item.id"
                    :selected="item.gradeName == this.studentData.gradeName"
                    :value="item.gradeName"
                  >
                    {{ item.gradeName }}
                  </option>
                </select>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter
          ><SubmitButton
            name="Enregistrer"
            class="btn btn-primary"
            @click="updateStudent()"
        /></ModalFooter>
      </ModalDialog>
    </ModalContainer>
  </div>
</template>
