<script>
import ModalContainer from "@/components/modal/ModalContainer.vue";
import ModalOpenButton from "@/components/modal/ModalOpenButton.vue";
import ModalHeader from "@/components/modal/ModalHeader.vue";
import ModalBody from "@/components/modal/ModalBody.vue";
import ModalFooter from "@/components/modal/ModalFooter.vue";
import ModalDialog from "@/components/modal/ModalDialog.vue";
import SubmitButton from "./button/SubmitButton.vue";
import { addCourse } from "../httpRequest/courseRequest";
import { NotyfMessage } from "../utilities";

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

  data() {
    return { courseName: "" };
  },
  methods: {
    saveCourse() {
      addCourse({ courseName: this.courseName })
        .then(() => {
          this.$store.dispatch("fetchCourses");
          NotyfMessage("Cours ajouté", "success");
          window.$("#addCourse").modal("hide");
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 400) {
            console.log(err);
            NotyfMessage(err.response.data.errorMessage, "error");
          }
        });
    },
  },
};
</script>

<template>
  <div>
    <ModalOpenButton class="btn btn-sm btn-primary mx-1" modalAction="addCourse">
      <i class="bi bi-journal-plus"></i>
      <span> Nouveau Cours</span>
    </ModalOpenButton>
    <ModalContainer modalAction="addCourse">
      <ModalDialog class="modal-sm">
        <ModalHeader title="Ajouter Cours" />
        <ModalBody>
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              @input="(event) => (courseName = event.target.value.trim())"
              aria-describedby="helpId"
              placeholder="Nom du cours"
            />
          </div>
        </ModalBody>
        <ModalFooter
          ><SubmitButton
            name="Enregistrer"
            class="btn btn-primary"
            @click="saveCourse()"
            :disabled="this.courseName == '' || this.courseName == null"
        /></ModalFooter>
      </ModalDialog>
    </ModalContainer>
  </div>
</template>
