<script>
import Navbar from "@/components/NavBar.vue";
import Offcanvas from "@/components/OffCanvas.vue";
import Titlebar from "@/components/TitleBar.vue";

export default {
  props: ["employee_id"],
  components: { Navbar, Offcanvas, Titlebar },
  data() {
    return {
      lastName: null,
      firstName: null,
      email: null,
      nif: null,
      phone: null,
      birthDate: null,
      sexe: null,
      functions: [],
    };
  },
  computed: {
    getEmployee() {
      return this.$store.getters.getEmployee;
    },
    getFunctions() {
      return this.$store.getters.getListFunctions;
    },
  },
  methods: {
    isUserHasFunction(funcs, func) {
      let stmt = null;
      funcs.forEach((f) => {
        if (f.functionName == func) {
          stmt = f.functionName;
        }
      });

      return stmt;
    },
    onChange(func, $event) {
      const checked = $event.target.checked;
      if (checked) {
        if (this.isUserHasFunction(this.functions, func) == null) {
          this.functions.push({ functionName: func });
        }
      } else {
        const myarr = this.functions;
        for (let i = 0; i < myarr.length; i++) {
          if (myarr[i].functionName === func) myarr.splice(i, 1);
        }
      }
    },
  },
  mounted() {
    this.$store.dispatch("fetchEmployee", this.employee_id);

    this.$store.dispatch("fetchFunctions");
  },
};
</script>

<template>
  <div v-if="this.getFunctions && this.getEmployee">
    <Navbar />

    <Offcanvas />

    <main class="mt-5">
      <div class="container-fluid">
        <Titlebar
          :title="`Employé: ${this.getEmployee.firstName} ${this.getEmployee.lastName}`"
        />

        <div class="card shadow mt-3 p-2">
          <div class="card-header acc-bg d-flex justify-content-between">
            <span>Informations Personnelles</span>
            <div>
              <button class="btn btn-sm btn-light mx-1">
                <i class="bi bi-pen"></i>
              </button>
              <button class="btn btn-sm btn-danger">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
          <div class="row row-cols-1 row-cols-sm-2 mt-2">
            <div class="col mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Nom"
                :value="this.getEmployee.lastName"
                @input="(event) => (lastName = event.target.value.trim())"
              />
            </div>
            <div class="col mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Prénom"
                :value="this.getEmployee.firstName"
                @input="(event) => (firstName = event.target.value.trim())"
              />
            </div>

            <div class="col mb-3">
              <input
                type="email"
                class="form-control"
                placeholder="Email"
                :value="this.getEmployee.email"
                @input="(event) => (email = event.target.value.trim())"
              />
            </div>
            <div class="col mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Nif"
                :value="this.getEmployee.nif"
                @input="(event) => (nif = event.target.value.trim())"
              />
            </div>
            <div class="col mb-3">
              <div class="input-group">
                <span class="input-group-text">+509</span>
                <input
                  type="number"
                  aria-label="First name"
                  class="form-control"
                  placeholder="00000000"
                  :value="this.getEmployee.phone"
                  @input="(event) => (phone = event.target.value.trim())"
                />
              </div>
            </div>
            <div class="col mb-3">
              <div class="input-group">
                <span class="input-group-text">D.Naissance</span>
                <input
                  type="date"
                  aria-label="First name"
                  class="form-control"
                  placeholder="00000000"
                  @input="(event) => (birthDate = event.target.value.trim())"
                />
              </div>
            </div>
            <div class="col mb-3">
              <label for="">Sexe</label>
              <div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="masculin"
                    value="Masculin"
                    v-model="sexe"
                    :checked="this.getEmployee.sexe == 'Masculin'"
                  />
                  <label class="form-check-label" for="masculin">Masculin</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="feminin"
                    value="Féminin"
                    v-model="sexe"
                    :checked="this.getEmployee.sexe == 'Féminin'"
                  />
                  <label class="form-check-label" for="feminin">Féminin</label>
                </div>
              </div>
            </div>
            <div class="col mb-3">
              <div class="mb-3">
                <label for="" class="text-dark">Fonction(s): </label>
                <div class="">
                  <div
                    class="form-check form-check-inline"
                    v-for="item in this.getFunctions"
                    :key="item.id"
                  >
                    <label class="form-check-label" for="USER">{{
                      item.functionName
                    }}</label>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="USER"
                      :checked="
                        this.isUserHasFunction(
                          this.getEmployee.functions,
                          item.functionName
                        )
                      "
                      @change="onChange(item.functionName, $event)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row row-cols-12 mt-2">
          <div class="col pb-2"></div>
        </div>
      </div>
    </main>
  </div>
</template>
