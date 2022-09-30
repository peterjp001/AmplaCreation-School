<script>
import ModalAddEmployee from "@/components/ModalAddEmployee.vue";

export default {
  components: { ModalAddEmployee },
  data() {
    return {};
  },
  computed: {
    getEmployees() {
      return this.$store.getters.getListEmployees;
    },
  },
  mounted() {
    this.$store.dispatch("fetchEmployees");
  },
};
</script>

<template>
  <div class="container-fluid">
    <div class="mt-3">
      <ModalAddEmployee />
    </div>
    <div class="row row-cols-12 mt-2">
      <div class="col pb-2">
        <div class="card shadow">
          <div class="card-header acc-bg d-flex justify-content-between">
            <span>Liste Employés</span>
          </div>
          <div class="card-body">
            <table
              id="example"
              class="table table-striped text-center nowrap"
              style="width: 100%"
            >
              <thead>
                <tr>
                  <th>CODE</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Sexe</th>
                  <th>Telephone</th>
                  <th>Nif</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in this.getEmployees" :key="item.id">
                  <td>{{ item.codeEmployee }}</td>
                  <td>{{ item.lastName }}</td>
                  <td>{{ item.firstName }}</td>
                  <td>{{ item.sexe }}</td>
                  <td>{{ item.phone }}</td>
                  <td>{{ item.nif }}</td>
                  <td>
                    <router-link
                      :to="`/employee/${item.id}`"
                      class="btn btn-sm btn-primary"
                    >
                      <i class="bi bi-info-circle"></i> Info
                    </router-link>
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
