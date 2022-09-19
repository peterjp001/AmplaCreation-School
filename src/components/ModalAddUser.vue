<script setup>
import ModalContainer from "@/components/modal/ModalContainer.vue";
import ModalOpenButton from "@/components/modal/ModalOpenButton.vue";
import ModalHeader from "@/components/modal/ModalHeader.vue";
import ModalBody from "@/components/modal/ModalBody.vue";
import ModalFooter from "@/components/modal/ModalFooter.vue";
</script>

<template>
  <div>
    <ModalOpenButton>
      <span class="bi bi-person-plus"></span>
      <span>Add User</span>
    </ModalOpenButton>
    <ModalContainer>
      <ModalHeader title="Add User" />
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
    </ModalContainer>
  </div>
</template>
