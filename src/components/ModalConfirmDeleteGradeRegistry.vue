<script>
import ModalContainer from "@/components/modal/ModalContainer.vue";
import ModalOpenButton from "@/components/modal/ModalOpenButton.vue";
import ModalBody from "@/components/modal/ModalBody.vue";
import ModalFooter from "@/components/modal/ModalFooter.vue";
import ModalDialog from "@/components/modal/ModalDialog.vue";
import SubmitButton from "@/components/button/SubmitButton.vue"; 
import { deleteGradeRegistry } from "../httpRequest/gradeRegistryRequest";

import { NotyfMessage } from "../utilities";

export default {
  components: {
    ModalContainer,
    ModalOpenButton,
    ModalBody,
    ModalFooter,
    ModalDialog,
    SubmitButton,
  },
  data() {
    return { data: [] };
  },
  props: ["gradeRegistryData"],
  methods: {
    deleteU() {
        deleteGradeRegistry(this.gradeRegistryData.id).then((res) => {
        if (res.status == 200) {
          NotyfMessage(`Plannification Supprimé`, "success");
          
          this.$store.dispatch("fetchGradeRegistryByIdGrade", {gradeId:this.gradeRegistryData.grade.id,academicYearId:localStorage.getItem('academicYear')});
          window.$(`#deleteGradeRegistry${this.gradeRegistryData.id}`).modal("hide");
          
        }
      }); 
    },
  },
  mounted() { 
  },
};
</script>

<template>
  <ModalOpenButton
    class="btn btn-sm btn-danger" 
    :modalAction="`deleteGradeRegistry${this.gradeRegistryData.id}`"
  >
    <i class="bi bi-trash"></i> Supprimer
  </ModalOpenButton>
  <ModalContainer :modalAction="`deleteGradeRegistry${this.gradeRegistryData.id}`">
    <ModalDialog class="modal-dialog-centered">
      <ModalBody>
        <div class="p-3 d-flex justify-content-center">
        {{this.gradeRegistryData.grade.id}}
          <span class="fs-5 fw-bold"
            ><i class="bi bi-exclamation-triangle"></i> Voulez-vous supprimer la planification "{{
              this.gradeRegistryData.id
            }}" ?</span
          >
        </div>
      </ModalBody>
      <ModalFooter>
        <SubmitButton id="sb" class="btn-danger" name="Supprimer" @click="deleteU()" />
      </ModalFooter>
    </ModalDialog>
  </ModalContainer>
</template>
