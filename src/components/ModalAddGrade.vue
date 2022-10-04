<script>
import ModalContainer from "@/components/modal/ModalContainer.vue";
import ModalOpenButton from "@/components/modal/ModalOpenButton.vue";
import ModalHeader from "@/components/modal/ModalHeader.vue";
import ModalBody from "@/components/modal/ModalBody.vue";
import ModalFooter from "@/components/modal/ModalFooter.vue";
import ModalDialog from "@/components/modal/ModalDialog.vue";
import SubmitButton from "./button/SubmitButton.vue";
import { NotyfMessage } from "../utilities";
import { reactive } from "vue";

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

  setup() {
    const form = reactive([
      { courseName: null, teacherName: null, timeStart: null, timeEnd: null },
    ]);
    const grade = reactive({ gradeName: null });

    const addCourse = () => {
      form.push({ courseName: null, teacherName: null, timeStart: null, timeEnd: null });
    };

    const removeCourse = (index) => {
      if (form.length > 1) form.splice(index, 1);
    };

    const saveGrade = () => {
      for (let i = 0; i < form.length; i++) {
        let item = form[i];
        if (
          item.courseName == null ||
          item.teacherName == null ||
          item.timeStart == null ||
          item.timeEnd == null
        ) {
          NotyfMessage("no", "danger");
        } else {
          NotyfMessage("yes", "success");
        }
      }
    };

    return {
      form,
      grade,
      addCourse,
      removeCourse,
      saveGrade,
    };
  },
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
            <label for="">Nom de la classe</label>
            <input
              type="text"
              class="form-control"
              placeholder="Nom de la classe"
              v-model="grade.gradeName"
            />
          </div>

          <div class="mb-3">
            <div class="d-flex">
              <button class="btn btn-primary" @click="addCourse">
                <i class="bi bi-plus"></i> Ajouter Cours
              </button>
            </div>
            <hr />
            <div class="container">
              <form v-for="(item, index) in form" :key="item.id">
                <div class="row row-cols-5 border shadow p-2">
                  <div class="col">
                    <input type="text" class="form-control" v-model="item.courseName" />
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" v-model="item.teacherName" />
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" v-model="item.timeStart" />
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" v-model="item.timeEnd" />
                  </div>
                  <div class="col d-flex justify-content-center">
                    <button class="btn btn-danger" @click.prevent="removeCourse(index)">
                      <i class="bi bi-x-circle"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <SubmitButton name="Enregistrer" class="btn btn-primary" @click="saveGrade" />
        </ModalFooter>
      </ModalDialog>
    </ModalContainer>
  </div>
</template>
