<script>
import ModalContainer from "@/components/modal/ModalContainer.vue";
import ModalOpenButton from "@/components/modal/ModalOpenButton.vue";
import ModalHeader from "@/components/modal/ModalHeader.vue";
import ModalBody from "@/components/modal/ModalBody.vue";
import ModalFooter from "@/components/modal/ModalFooter.vue";
import ModalDialog from "@/components/modal/ModalDialog.vue";
import SubmitButton from "./button/SubmitButton.vue";
import { updateCourse } from "@/httpRequest/courseRequest.js";
import { NotyfMessage } from "../utilities";

export default {
  props: ["courseData"],
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
    updateCourse() {
      updateCourse(this.courseData.id, { courseName: this.courseName }).then(() => {
        NotyfMessage("Cours Modifié", "success");
        window.$("#" + "edit-" + this.courseData.id).modal("hide");
        this.$store.dispatch("fetchCourses");
      });
    },
  },
};
</script>

<template>
  <div>
    <ModalOpenButton
      class="btn btn-sm btn-primary mx-1"
      :modalAction="'edit-' + this.courseData.id"
    >
      <i class="bi bi-pen"></i>
      <span> Modifier</span>
    </ModalOpenButton>
    <ModalContainer :modalAction="'edit-' + this.courseData.id">
      <ModalDialog class="modal-sm">
        <ModalHeader title="Modifier Cours" />
        <ModalBody>
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              :value="this.courseData.courseName"
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
            @click="updateCourse()"
            :disabled="this.courseName == '' || this.courseName == null"
        /></ModalFooter>
      </ModalDialog>
    </ModalContainer>
  </div>
</template>
