<script>
import { addFunction, updateFunction } from "../httpRequest/functionRequest";
import { NotyfMessage } from "../utilities";
export default {
  data() {
    return {
      showInputAddFunction: false,
      functionName: null,
      idFunction: null,
      showInputEditFunction: false,
    };
  },
  computed: {
    getFunctions() {
      return this.$store.getters.getListFunctions;
    },
  },
  methods: {
    saveFunction() {
      addFunction({ functionName: this.functionName }).then(() => {
        this.showInputAddFunction = false;
        this.functionName = null;
        NotyfMessage("Fonction ajouté", "success");
        this.$store.dispatch("fetchFunctions");
      });
    },
    toggleEditFunction(func) {
      this.showInputAddFunction = false;
      this.showInputEditFunction = true;
      this.functionName = func.functionName;
      this.idFunction = func.id;
    },
    editFunction() {
      updateFunction(this.idFunction, { functionName: this.functionName }).then(() => {
        this.showInputEditFunction = false;
        NotyfMessage("Fonction Modifié", "success");
        this.$store.dispatch("fetchFunctions");
        this.idFunction = null;
        this.functionName = null;
      });
    },

    cancelEditFunction() {
      this.showInputEditFunction = false;
      this.idFunction = null;
      this.functionName = null;
    },
  },
  mounted() {
    this.$store.dispatch("fetchFunctions");
  },
};
</script>

<template>
  <div class="container-fluid">
    <div class="mt-3">
      <button
        class="btn btn-sm btn-primary"
        v-if="!showInputAddFunction && !showInputEditFunction"
        @click="showInputAddFunction = !showInputAddFunction"
      >
        <i class="bi bi-plus"></i> Nouvelle Fonction
      </button>
      <div id="aaa" class="input-group mb-3 w-50" v-if="showInputAddFunction">
        <input
          type="text"
          class="form-control"
          placeholder="Fonction"
          @input="(event) => (functionName = event.target.value.trim())"
        />
        <button
          class="btn btn-primary"
          :disabled="this.functionName == null || this.functionName == ''"
          type="button"
          @click="saveFunction"
        >
          Enregistrer
        </button>
        <button
          class="btn btn-secondary"
          type="button"
          @click="showInputAddFunction = !showInputAddFunction"
        >
          cancel
        </button>
      </div>
      <div id="aaa" class="input-group mb-3 w-50" v-if="showInputEditFunction">
        <input
          type="text"
          class="form-control"
          placeholder="Fonction"
          :value="this.functionName"
          @input="(event) => (functionName = event.target.value.trim())"
        />
        <button
          class="btn btn-primary"
          :disabled="this.functionName == null || this.functionName == ''"
          type="button"
          @click="editFunction"
        >
          Modifier
        </button>
        <button class="btn btn-secondary" type="button" @click="cancelEditFunction">
          cancel
        </button>
      </div>
    </div>
    <div class="row row-cols-12 mt-2">
      <div class="col pb-2">
        <div class="card shadow">
          <div class="card-header acc-bg d-flex justify-content-between">
            <span>Liste Fonctions</span>
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
                  <th>Fonction</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in this.getFunctions" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.functionName }}</td>
                  <td>
                    <button
                      class="btn btn-sm btn-primary"
                      @click="toggleEditFunction(item)"
                    >
                      <i class="bi bi-pen"></i> Modifier
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
