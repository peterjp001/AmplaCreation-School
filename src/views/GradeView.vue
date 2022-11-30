<script>
import Navbar from "@/components/NavBar.vue";
import Offcanvas from "@/components/OffCanvas.vue";
import Titlebar from "@/components/TitleBar.vue";
import { addGrade, updateGrade } from "../httpRequest/GradeRequest";
import { NotyfMessage } from "../utilities";

export default {
  components: { Navbar, Offcanvas, Titlebar },
  data() {
    return {
      showInputAddGrade: false,
      gradeName: null,
      idGrade: null,
      showInputEditGrade: false,
    };
  },
  computed: {
    getGrades() {
      return this.$store.getters.getListGrades;
    },
  },
  methods: {
    saveGrade() {
      addGrade({ gradeName: this.gradeName }).then(() => {
        this.showInputAddGrade = false;
        this.gradeName = null;
        NotyfMessage("Classe ajoutée", "success");
        this.$store.dispatch("fetchGrades");
      }).catch((err) => { 
          if (err.response.status == 400) { 
            NotyfMessage(err.response.data.errorMessage, "error");
          }
        });
    },
    toggleeditGrade(func) {
      this.showInputAddGrade = false;
      this.showInputEditGrade = true;
      this.gradeName = func.gradeName;
      this.idGrade = func.id;
    },
    editGrade() {
      updateGrade(this.idGrade, { gradeName: this.gradeName }).then(() => {
        this.showInputEditGrade = false;
        NotyfMessage("Classe Modifiée", "success");
        this.$store.dispatch("fetchGrades");
        this.idGrade = null;
        this.gradeName = null;
      });
    },

    cancelEditGrade() {
      this.showInputEditGrade = false;
      this.idGrade = null;
      this.gradeName = null;
    },
  },
  mounted() {
    this.$store.dispatch("fetchGrades");
  },
};
</script>

<template>
  <div>
    <Navbar />

    <Offcanvas />

    <main class="mt-5">
      <div class="container-fluid">
        <Titlebar title="Classe" />

        <div class="container-fluid">
          <div class="mt-3">
            <button
              class="btn btn-sm btn-primary"
              v-if="!showInputAddGrade && !showInputEditGrade"
              @click="showInputAddGrade = !showInputAddGrade"
            >
              <i class="bi bi-plus"></i> Nouvelle Classe
            </button>
            <div id="aaa" class="input-group mb-3 w-50" v-if="showInputAddGrade">
              <input
                type="text"
                class="form-control"
                placeholder="Nom de la classe"
                @input="(event) => (gradeName = event.target.value.trim())"
              />
              <button
                class="btn btn-primary"
                :disabled="this.gradeName == null || this.gradeName == ''"
                type="button"
                @click="saveGrade"
              >
                Enregistrer
              </button>
              <button
                class="btn btn-secondary"
                type="button"
                @click="showInputAddGrade = !showInputAddGrade"
              >
                cancel
              </button>
            </div>
            <div id="aaa" class="input-group mb-3 w-50" v-if="showInputEditGrade">
              <input
                type="text"
                class="form-control"
                placeholder="Fonction"
                :value="this.gradeName"
                @input="(event) => (gradeName = event.target.value.trim())"
              />
              <button
                class="btn btn-primary"
                :disabled="this.gradeName == null || this.gradeName == ''"
                type="button"
                @click="editGrade"
              >
                Modifier
              </button>
              <button class="btn btn-secondary" type="button" @click="cancelEditGrade">
                cancel
              </button>
            </div>
          </div>
          <div class="row row-cols-12 mt-2">
            <div class="col pb-2">
              <div class="card shadow">
                <div class="card-header acc-bg d-flex justify-content-between">
                  <span>Liste Classe</span>
                </div>
                <div class="card-body">
                  <table
                    id="example"
                    class="table table-striped text-center nowrap"
                    style="width: 100%"
                  >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Classe</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in this.getGrades" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.gradeName }}</td>
                        <td>
                          <button
                            class="btn btn-sm btn-primary mx-1"
                            @click="toggleeditGrade(item)"
                          >
                            <i class="bi bi-pen"></i> Modifier
                          </button>
                          <RouterLink
                            :to="`grade/${item.id}`"
                            class="btn btn-sm btn-primary"
                            ><i class="bi bi-info-circle"> </i> Info Cours </RouterLink
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
