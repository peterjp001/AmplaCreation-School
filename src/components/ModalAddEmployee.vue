<script setup>
import ModalContainer from "@/components/modal/ModalContainer.vue";
import ModalOpenButton from "@/components/modal/ModalOpenButton.vue";
import ModalHeader from "@/components/modal/ModalHeader.vue";
import ModalBody from "@/components/modal/ModalBody.vue";
import ModalFooter from "@/components/modal/ModalFooter.vue";
import ModalDialog from "@/components/modal/ModalDialog.vue";
</script>

<template>
  <div>
    <ModalOpenButton class="btn btn-sm btn-primary mx-1" modalAction="addEmployee">
      <span class="bi bi-person-plus"></span>
      <span>Nouveau Employee</span>
    </ModalOpenButton>
    <ModalContainer modalAction="addEmployee">
      <ModalDialog class="modal-lg">
        <ModalHeader title="Ajouter Employee" />
        <ModalBody>
          <div class="mb-3">
            <label for="" class="form-label"></label>
            <input
              type="text"
              class="form-control"
              name=""
              id=""
              aria-describedby="helpId"
              placeholder=""
            />
          </div>
        </ModalBody>
        <ModalFooter />
      </ModalDialog>
    </ModalContainer>
  </div>
</template>
