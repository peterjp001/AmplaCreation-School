<script>
import ModalContainer from "@/components/modal/ModalContainer.vue";
import ModalOpenButton from "@/components/modal/ModalOpenButton.vue";
import ModalBody from "@/components/modal/ModalBody.vue";
import ModalFooter from "@/components/modal/ModalFooter.vue";
import ModalDialog from "@/components/modal/ModalDialog.vue";
import SubmitButton from "@/components/button/SubmitButton.vue";
import { deleteUser } from "../httpRequest/userRequest.js";
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
  props: ["userData"],
  methods: {
    deleteU() {
      deleteUser(this.userData.id).then((res) => {
        if (res.status == 200) {
          NotyfMessage(`Utilisateur Supprimé`, "success");
          window.$("#deleteUser").modal("hide");
          this.debounce = setTimeout(() => {
            this.$router.push("/users");
          }, 1000);
        }
      });
    },
  },
};
</script>

<template>
  <ModalOpenButton
    class="btn btn-sm btn-danger"
    :disabled="this.userData.username == 'JohnDoe'"
    modalAction="deleteUser"
  >
    <i class="bi bi-trash"></i> Supprimer
  </ModalOpenButton>
  <ModalContainer modalAction="deleteUser">
    <ModalDialog class="modal-dialog-centered">
      <ModalBody>
        <div class="p-3 d-flex justify-content-center">
          <span class="fs-5 fw-bold"
            ><i class="bi bi-exclamation-triangle"></i> Voulez-vous supprimer "{{
              this.userData.username
            }}"" ?</span
          >
        </div>
      </ModalBody>
      <ModalFooter>
        <SubmitButton id="sb" class="btn-danger" name="Supprimer" @click="deleteU()" />
      </ModalFooter>
    </ModalDialog>
  </ModalContainer>
</template>
