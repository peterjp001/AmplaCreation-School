<script>
import ModalContainer from "@/components/modal/ModalContainer.vue";
import ModalOpenButton from "@/components/modal/ModalOpenButton.vue";
import ModalHeader from "@/components/modal/ModalHeader.vue";
import ModalBody from "@/components/modal/ModalBody.vue";
import ModalFooter from "@/components/modal/ModalFooter.vue";
import ModalDialog from "@/components/modal/ModalDialog.vue";
import SubmitButton from "@/components/button/SubmitButton.vue";
import { addEmployee } from "@/httpRequest/employeeRequest";
import { NotyfMessage } from "../utilities";

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
  computed: {
    getFunctions() {
      return this.$store.getters.getListFunctions;
    },
    isImputEmpty() {
      if (
        this.lastName == null ||
        this.firstName == null ||
        this.email == null ||
        this.nif == null ||
        this.phone == null ||
        this.birthDate == null ||
        this.sexe == null ||
        this.functions.length == 0
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
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
    newEmployee() {
      const employee = {
        lastName: this.lastName,
        firstName: this.firstName,
        email: this.email,
        nif: this.nif,
        phone: this.phone,
        birthDate: this.birthDate,
        sexe: this.sexe,
        functions: this.functions,
      };
      addEmployee(employee)
        .then(() => {
          NotyfMessage("Employée ajouté", "success");
          window.$("#addEmployee").modal("hide");
          this.$store.dispatch("fetchEmployees");
        })
        .catch((err) => {
          if (err.response.status == 400) {
            NotyfMessage(err.response.data.errorMessage, "error");
          }
        });
    },
  },
  mounted() {
    this.$store.dispatch("fetchFunctions");
  },
};
</script>

<template>
  <div>
    <ModalOpenButton class="btn btn-sm btn-primary mx-1" modalAction="addEmployee">
      <span class="bi bi-person-plus"></span>
      <span>Nouveau Employee</span>
    </ModalOpenButton>
    <ModalContainer modalAction="addEmployee">
      <ModalDialog class="modal-lg">
        <ModalHeader title="Ajouter Employee" />
        <ModalBody>
          <div class="row row-cols-1 row-cols-sm-2">
            <div class="col mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Nom"
                @input="(event) => (lastName = event.target.value.trim())"
              />
            </div>
            <div class="col mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Prénom"
                @input="(event) => (firstName = event.target.value.trim())"
              />
            </div>

            <div class="col mb-3">
              <input
                type="email"
                class="form-control"
                placeholder="Email"
                @input="(event) => (email = event.target.value.trim())"
              />
            </div>
            <div class="col mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Nif"
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
                  />
                  <label class="form-check-label" for="masculin">Masculin</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="feminin"
                    value="Feminin"
                    v-model="sexe"
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
                      @change="onChange(item.functionName, $event)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <SubmitButton
            class="btn-primary"
            name="Sauvegarder"
            @click="newEmployee"
            :disabled="this.isImputEmpty"
          />
        </ModalFooter>
      </ModalDialog>
    </ModalContainer>
  </div>
</template>
