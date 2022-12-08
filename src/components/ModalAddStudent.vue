<script>
import ModalContainer from "@/components/modal/ModalContainer.vue";
import ModalOpenButton from "@/components/modal/ModalOpenButton.vue";
import ModalHeader from "@/components/modal/ModalHeader.vue";
import ModalBody from "@/components/modal/ModalBody.vue";
import ModalFooter from "@/components/modal/ModalFooter.vue";
import ModalDialog from "@/components/modal/ModalDialog.vue";
import SubmitButton from "./button/SubmitButton.vue"; 

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
    saveStudent(){
      alert("ok");
    }
  },
};
</script>

<template>
  <div>
    <ModalOpenButton class="btn btn-sm btn-primary mx-1" modalAction="addStudent">
      <i class="bi bi-person-plus"></i>
      <span> Nouveau éleve</span>
    </ModalOpenButton>
    <ModalContainer modalAction="addStudent">
      <ModalDialog class="modal-lg">
        <ModalHeader title="Ajouter éleve" />
        <ModalBody>
          <form class="row g-3">
            <div class="col-md-6">
              <label for="inputEmail4" class="form-label">Email</label>
              <input type="email" class="form-control" id="inputEmail4">
            </div>
            <div class="col-md-6">
              <label for="inputPassword4" class="form-label">Password</label>
              <input type="password" class="form-control" id="inputPassword4">
            </div>
             
          </form>
         
        </ModalBody>
        <ModalFooter
          ><SubmitButton
            name="Enregistrer"
            class="btn btn-primary"
            @click="saveStudent()" 
        /></ModalFooter>
      </ModalDialog>
    </ModalContainer>
  </div>
</template>
