<script>
import ModalContainer from "@/components/modal/ModalContainer.vue";
import ModalOpenButton from "@/components/modal/ModalOpenButton.vue";
import ModalBody from "@/components/modal/ModalBody.vue";
import ModalFooter from "@/components/modal/ModalFooter.vue";
import ModalDialog from "@/components/modal/ModalDialog.vue";
import SubmitButton from "@/components/button/SubmitButton.vue";
import { updateAcademicYear } from "../httpRequest/academicYearRequest";
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
  computed: {
    ay() {
      return (
        new Date(this.ayData.dateStart).getFullYear() +
        "-" +
        new Date(this.ayData.dateEnd).getFullYear()
      );
    },
  },
  props: ["ayData"],
  methods: {
    setInactive() {
      updateAcademicYear(this.ayData.id, { status: "inactive" })
        .then((res) => {
          if (res.status == 200) {
            NotyfMessage(`Année Académique Inactive`, "success");
            this.$store.dispatch("fetchAcademicYears");
            window.$("#mAYInactive-" + this.ayData.id).modal("hide");

            //   this.debounce = setTimeout(() => {
            //     this.$router.push("/academicyear");
            //   }, 1000);
          }
        })
        .catch((err) => {
          if (err.response.status == 400) {
            NotyfMessage(err.response.data.errorMessage, "error");
          }
        });
    },
  },
};
</script>

<template>
  <ModalOpenButton
    class="btn btn-sm btn-danger"
    :modalAction="'mAYInactive-' + this.ayData.id"
    :disabled="this.ayData.status === 'inactive'"
  >
    Mettre inactive
  </ModalOpenButton>
  <ModalContainer :modalAction="'mAYInactive-' + this.ayData.id">
    <ModalDialog class="modal-dialog-centered">
      <ModalBody>
        <div class="p-3 d-flex justify-content-center">
          <span class="fs-5 fw-bold"
            ><i class="bi bi-exclamation-triangle"></i> Voulez-vous mettre inactive
            l'année académique {{ this.ay }} ?</span
          >
        </div>
      </ModalBody>
      <ModalFooter>
        <SubmitButton
          id="sb"
          class="btn-danger"
          name="Mettre inactive"
          @click="setInactive()"
        />
      </ModalFooter>
    </ModalDialog>
  </ModalContainer>
</template>
