<script>
import Navbar from "@/components/NavBar.vue";
import Offcanvas from "@/components/OffCanvas.vue";
import Titlebar from "@/components/TitleBar.vue";
import { addAcademicYear, updateAcademicYear } from "../../httpRequest/academicYearRequest";
import { NotyfMessage } from "../../utilities";
import ModalCloseAY from "../../components/ModalCloseAY.vue";

export default {
  components: { Navbar, Offcanvas, Titlebar, ModalCloseAY },
  data() {
    return {
      showInputAY: false,
      dateStart: null,
      dateEnd: null,
      idAY: null,
      showInputeditAY: false,
    };
  },
  computed: {
    getAcademicYears() {
      return this.$store.getters.getListAcademicYear;
    },
  },
  methods: {
    saveAY() {
      if (
        this.dateStart == null ||
        this.dateEnd == null ||
        this.dateStart == "" ||
        this.dateEnd == ""
      ) {
        NotyfMessage("Précisez la date début et la date fin!", "danger");
      } else {
        addAcademicYear({
          dateStart: this.dateStart,
          dateEnd: this.dateEnd,
          status: "active",
        })
          .then((res) => {
            console.log(res);
            this.showInputAY = false;
            this.dateStart = null;
            this.dateEnd = null;
            NotyfMessage("Année Académique ajouté", "success");
            this.$store.dispatch("fetchAcademicYears");
          })
          .catch((err) => {
            if (err.response.status == 400) {
              NotyfMessage(err.response.data.errorMessage, "error");
            }
          });
      }
    },
    toggleEditAY(ay) {
      this.showInputAY = false;
      this.showInputeditAY = true;
      this.dateStart = ay.dateStart;
      this.dateEnd = ay.dateEnd;
      this.idAY = ay.id;
    },
    editAY() {
      if (
        this.dateStart == null ||
        this.dateEnd == null ||
        this.dateStart == "" ||
        this.dateEnd == ""
      ) {
        NotyfMessage("Précisez la date début et la date fin!", "danger");
      } else {
        updateAcademicYear(this.idAY, {
          dateStart: this.dateStart,
          dateEnd: this.dateEnd,
        })
          .then(() => {
            this.showInputeditAY = false;
            NotyfMessage("Année Académique Modifié", "success");
            this.$store.dispatch("fetchAcademicYears");
            this.idAY = null;
            this.dateStart = null;
            this.dateEnd = null;
          })
          .catch((err) => {
            if (err.response.status == 400) {
              NotyfMessage(err.response.data.errorMessage, "error");
            }
          });
      }
    },

    cancelAY() {
      this.showInputeditAY = false;
      this.idAY = null;
      this.dateStart = null;
      this.dateEnd = null;
    },
  },
  mounted() {
    this.$store.dispatch("fetchAcademicYears");
  },
};
</script>

<template>
  <div>
    <Navbar />

    <Offcanvas />

    <main class="mt-5">
      <div class="container-fluid">
        <Titlebar title="Année Académique" />

        <div class="container-fluid">
          <div class="mt-3">
            <button
              class="btn btn-sm btn-primary"
              v-if="!showInputAY && !showInputeditAY"
              @click="showInputAY = !showInputAY"
            >
              <i class="bi bi-plus"></i> Nouvelle Année Académique
            </button>
            <div id="aaa" class="input-group mb-3 w-100" v-if="showInputAY">
              <div>
                <label for="">Date debut</label>
                <input type="date" class="form-control" v-model="dateStart" />
              </div>
              <div>
                <label for="">Date Fin</label>
                <input type="date" class="form-control" v-model="dateEnd" />
              </div>
              <div>
                <label for="">Action</label>
                <div>
                  <button class="btn btn-primary" type="button" @click="saveAY">
                    Enregistrer
                  </button>
                  <button
                    class="btn btn-secondary"
                    type="button"
                    @click="showInputAY = !showInputAY"
                  >
                    cancel
                  </button>
                </div>
              </div>
            </div>
            <div id="aaa" class="input-group mb-3 w-100" v-if="showInputeditAY">
              <div>
                <label for="">Date debut</label>
                <input type="date" class="form-control" v-model="dateStart" />
              </div>
              <div>
                <label for="">Date Fin</label>
                <input type="date" class="form-control" v-model="dateEnd" />
              </div>
              <div>
                <label for="">Action</label>
                <div>
                  <button class="btn btn-primary" type="button" @click="editAY">
                    Enregistrer
                  </button>
                  <button class="btn btn-secondary" type="button" @click="cancelAY">
                    cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="row row-cols-12 mt-2">
            <div class="col pb-2">
              <div class="card shadow">
                <div class="card-header acc-bg d-flex justify-content-between">
                  <span>Liste Cours</span>
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
                        <th>Date Début</th>
                        <th>Date Fin</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in this.getAcademicYears" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.dateStart }}</td>
                        <td>{{ item.dateEnd }}</td>
                        <td>
                          <span
                            class="badge"
                            :class="item.status == 'active' ? 'bg-success' : 'bg-warning'"
                            >{{ item.status }}</span
                          >
                        </td>
                        <td>
                          <button
                            :disabled="item.status == 'inactive'"
                            class="btn btn-sm btn-primary mx-1"
                            @click="toggleEditAY(item)"
                          >
                            <i class="bi bi-pen"></i> Modifier
                          </button>
                          <ModalCloseAY :ayData="item" />
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
