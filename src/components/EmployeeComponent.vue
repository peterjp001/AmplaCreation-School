<script>
import ModalAddEmployee from "@/components/ModalAddEmployee.vue";

export default {
  components: { ModalAddEmployee },
  data() {
    return {};
  },
  computed: {
    getCData() {
      return this.$store.getters.getCardData;
    },
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
            <span>Liste Utilisateurs</span>
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
                  <th>USERNAME</th>
                  <th>ROLES</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tiger</td>
                  <td>Nixon</td>
                  <td>
                    <span class="badge bg-success">ADMIN</span
                    ><span class="badge bg-warning">USER</span>
                  </td>
                </tr>
                <tr>
                  <td>Tiger</td>
                  <td>Nixon</td>
                  <td>
                    <span class="badge bg-success">ADMIN</span
                    ><span class="badge bg-warning">USER</span>
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
