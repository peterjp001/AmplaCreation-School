<script>
import ModalContainer from "@/components/modal/ModalContainer.vue";
import ModalOpenButton from "@/components/modal/ModalOpenButton.vue";
import ModalHeader from "@/components/modal/ModalHeader.vue";
import ModalBody from "@/components/modal/ModalBody.vue";
import ModalFooter from "@/components/modal/ModalFooter.vue";
import ModalDialog from "@/components/modal/ModalDialog.vue";
import SubmitButton from "./button/SubmitButton.vue";
// import { NotyfMessage } from "../utilities";

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
    return { cours: 1 };
  },
  computed: {
    getCours() {
      return this.cours;
    },
  },
  methods: { addCourseToClass() {} },
};
</script>

<template>
  <div>
    <ModalOpenButton class="btn btn-sm btn-primary mx-1" modalAction="addCourse">
      <i class="bi bi-house"></i>
      <span> Nouvelle Classe</span>
    </ModalOpenButton>
    <ModalContainer modalAction="addCourse">
      <ModalDialog class="modal-lg modal-dialog-scrollable">
        <ModalHeader title="Ajouter Classe" />
        <ModalBody>
          <div class="mb-3">
            <input type="text" class="form-control" placeholder="Nom de la classe" />
          </div>
          <div class="mb-3">
            <div class="d-flex justify-content-between border-bottom p-2">
              <span>Cours Info</span>
              <button
                class="btn btn-sm btn-primary rounded-circle"
                @click="this.cours += 1"
              >
                <i class="bi bi-plus"></i>
              </button>
            </div>
            <div class=" ">
              <div class="container" v-for="item in this.getCours" :key="item.id">
                <div class="row row-cols-5 row-cols-sm-5 shadow py-3 my-2">
                  <div class="col">
                    <select class="form-select" name="" id="">
                      <option disabled selected>Cours</option>
                      <option>Istanbul</option>
                      <option>Jakarta</option>
                    </select>
                  </div>
                  <div class="col">
                    <select class="form-select" name="" id="">
                      <option disabled selected>Professeur</option>
                      <option>Istanbul</option>
                      <option>Jakarta</option>
                    </select>
                  </div>
                  <div class="col">Column</div>
                  <div class="col">Column</div>
                  <div class="col">
                    <button
                      class="btn btn-sm btn-danger rounded-circle"
                      @click="this.cours -= 1"
                    >
                      <i class="bi bi-x-circle"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <SubmitButton name="Enregistrer" class="btn btn-primary" />
        </ModalFooter>
      </ModalDialog>
    </ModalContainer>
  </div>
</template>
