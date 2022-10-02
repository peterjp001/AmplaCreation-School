<script>
import SubmitButton from "@/components/button/SubmitButton.vue";
import { NotyfMessage } from "../utilities";
import {
  updateEmployee,
  addFunctionToEmployee,
  removeFunctionToEmployee,
} from "@/httpRequest/employeeRequest";
export default {
  props: ["employee_id"],
  components: { SubmitButton },
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
      removeF: [],
      removeAction: false,
      addF: [],
      addAction: false,
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
      if (funcs != null) {
        funcs.forEach((f) => {
          if (f.functionName == func) {
            stmt = f.functionName;
          }
        });
      }
      return stmt;
    },
    onChange(func, $event) {
      const checked = $event.target.checked;
      if (checked) {
        if (this.isUserHasFunction(this.removeF, func) != null) {
          this.removeF.pop({ functionName: func });
        }
        if (this.isUserHasFunction(this.getEmployee.functions, func) == null) {
          this.addF.push({ functionName: func });
        }
      } else {
        if (this.isUserHasFunction(this.getEmployee.functions, func) != null) {
          this.removeF.push({ functionName: func });
        }
        if (this.isUserHasFunction(this.addF, func) != null) {
          this.addF.pop({ functionName: func });
        }
      }
    },
    updateEmployee() {
      const employee = {
        lastName: this.lastName,
        firstName: this.firstName,
        email: this.email,
        nif: this.nif,
        phone: this.phone,
        birthDate: this.birthDate,
        sexe: this.sexe,
      };
      updateEmployee(this.employee_id, employee).catch((err) => {
        console.log(err);
      });

      if (this.addF.length > 0) {
        this.addF.forEach((f) => {
          addFunctionToEmployee(this.employee_id, f.functionName).catch((err) => {
            console.log(err);
          });
        });
      }
      if (this.removeF.length > 0) {
        this.removeF.forEach((f) => {
          removeFunctionToEmployee(this.employee_id, f.functionName).catch((err) => {
            console.log(err);
          });
        });
      }
      NotyfMessage("Informations Modifié", "success");
      this.$store.dispatch("fetchEmployee", this.employee_id);
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
    <div class="container-fluid">
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
                  <label class="form-check-label" :for="item.id">{{
                    item.functionName
                  }}</label>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :id="item.id"
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
          <div class="col mb-3">
            <SubmitButton
              class="btn btn-primary"
              name="Modifier"
              @click="updateEmployee"
            />
          </div>
        </div>
      </div>

      <div class="row row-cols-12 mt-2">
        <div class="col pb-2"></div>
      </div>
    </div>
  </div>
</template>
