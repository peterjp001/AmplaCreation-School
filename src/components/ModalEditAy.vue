<script>
import ModalContainer from "@/components/modal/ModalContainer.vue";
import ModalOpenButton from "@/components/modal/ModalOpenButton.vue";
import ModalHeader from "@/components/modal/ModalHeader.vue";
import ModalBody from "@/components/modal/ModalBody.vue";
import ModalFooter from "@/components/modal/ModalFooter.vue";
import ModalDialog from "@/components/modal/ModalDialog.vue";
import SubmitButton from "./button/SubmitButton.vue";

export default {
  props: ["academicYearData"],
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
 
};
</script>

<template>
  <div>
    <ModalOpenButton
      class="btn btn-sm btn-primary"
      :modalAction="'edit-' + this.academicYearData.id"
    >
      Modifier
    </ModalOpenButton>
    <ModalContainer :modalAction="'edit-' + this.academicYearData.id">
      <ModalDialog class="modal-lg">
        <ModalHeader title="Modifier Année Académique" />
        <ModalBody>
          <div class="mb-3">{{ this.academicYearData }}</div>
        </ModalBody>
        <ModalFooter
          ><SubmitButton name="Enregistrer" class="btn btn-primary" @click="gh"
        /></ModalFooter>
      </ModalDialog>
    </ModalContainer>
  </div>
</template>
