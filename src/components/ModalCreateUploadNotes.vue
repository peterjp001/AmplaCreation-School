<script>
import ModalContainer from "@/components/modal/ModalContainer.vue";
import ModalOpenButton from "@/components/modal/ModalOpenButton.vue";
import ModalHeader from "@/components/modal/ModalHeader.vue";
import ModalBody from "@/components/modal/ModalBody.vue";
import ModalDialog from "@/components/modal/ModalDialog.vue";
import axios from "axios";

export default {
  components: {
    ModalContainer,
    ModalOpenButton,
    ModalHeader,
    ModalBody,
    ModalDialog,
  },

  data() {
    return { file: null, listNotesUploaded: [] };
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    uploadNotes() {
      let formData = new FormData();
      formData.append("academicYearId", localStorage.getItem("academicYear"));
      formData.append("attachment", this.file);
      axios
        .post("/send/notes", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.listNotesUploaded = res.data;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<template>
  <div>
    <ModalOpenButton
      class="btn btn-sm btn-primary mx-1"
      modalAction="createUploadNote"
    >
      <i class="bi bi-file-plus"></i>
      <span>Créer ou télécharger note(s)</span>
    </ModalOpenButton>
    <ModalContainer modalAction="createUploadNote">
      <ModalDialog class="modal-lg">
        <ModalHeader title="Créer ou télécharger note(s)" />
        <ModalBody>
          <div class="mb-3">
            <nav>
              <div class="nav nav-tabs border" id="nav-tab" role="tablist">
                <button
                  class="nav-link txt active"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  Creer
                </button>
                <button
                  class="nav-link txt"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  Télécharger
                </button>
              </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
              <div
                class="tab-pane fade show active p-3"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
                tabindex="0"
              >
                <div class="row row-cols-1 row-cols-sm-2">
                  <div class="col mb-3">
                    <label for="" class="form-label">Classe</label>
                    <select class="form-select form-select-sm" name="" id="">
                      <option selected>Select one</option>
                      <option value="">New Delhi</option>
                    </select>
                  </div>
                  <div class="col mb-3">
                    <label for="" class="form-label">Cours</label>
                    <select class="form-select form-select-sm" name="" id="">
                      <option selected>Select one</option>
                      <option value="">New Delhi</option>
                    </select>
                  </div>
                </div>
              </div>
              <div
                class="tab-pane fade p-3"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
                tabindex="0"
              >
                <form v-on:submit.prevent="uploadNotes">
                  <div class="input-group">
                    <input
                      type="file"
                      id="file"
                      ref="file"
                      class="form-control"
                      aria-describedby="inputGroupFileAddon04"
                      aria-label="Upload"
                      @change="handleFileUpload($event)"
                    />
                    <button
                      class="btn btn-primary"
                      type="submit"
                      id="inputGroupFileAddon04"
                    >
                      Télécharger
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div
            class="row row-cols-12 mt-3"
            v-if="this.listNotesUploaded.length > 0"
          >
            <div class="col pb-2">
              <div class="card shadow">
                <div class="card-header acc-bg d-flex justify-content-between">
                  <span>Liste des Notes enregistrées</span>
                  <button class="btn btn-sm btn-light">
                    <i class="bi bi-save"></i> Généré Rapport
                  </button>
                </div>
                <div class="card-body">
                  <table
                    id="example"
                    class="table table-striped nowrap"
                    style="width: 100%"
                  >
                    <thead>
                      <tr>
                        <th>Eleve</th>
                        <th>Professeur</th>
                        <th>Classe</th>
                        <th>Cours</th>
                        <th>Periode</th>
                        <th>Point</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in this.listNotesUploaded" :key="item.id">
                        <td>
                          {{ item.studentFirstName }} {{ item.studentLastName }}
                        </td>
                        <td>
                          {{ item.employeeFirstName }}
                          {{ item.employeeLastName }}
                        </td>
                        <td>{{ item.gradeName }}</td>
                        <td>{{ item.courseName }}</td>
                        <td>1</td>
                        <td>{{ parseFloat(item.point) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalDialog>
    </ModalContainer>
  </div>
</template>

<style scoped>
.txt {
  color: black !important;
}
</style>
