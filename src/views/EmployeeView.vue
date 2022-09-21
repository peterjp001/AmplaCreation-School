<script>
import Navbar from "@/components/NavBar.vue";
import Offcanvas from "@/components/OffCanvas.vue";
import Titlebar from "@/components/TitleBar.vue";
import ModalAddEmployee from "@/components/ModalAddEmployee.vue";

export default {
  components: { Navbar, Offcanvas, Titlebar, ModalAddEmployee },
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
  <div>
    <Navbar />

    <Offcanvas />

    <main class="mt-5">
      <div class="container-fluid">
        <Titlebar title="Employées" />

        <div class="card shadow mt-3 p-2">
          <div class="row row-cols-12 mt-2">
            <div class="col pb-2">
              <ModalAddEmployee />
            </div>
          </div>
        </div>

        <div class="row row-cols-12 mt-2">
          <div class="col pb-2">
            <div class="card shadow">
              <div class="card-header acc-bg d-flex justify-content-between">
                <span>Liste Utilisateurs</span>
                <span>
                  <a href="#" class="btn btn-sm text-light border">
                    <i class="bi bi-arrow-right-circle"></i>
                  </a>
                </span>
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
                      <th>ACTION</th>
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
                      <td class="">
                        <select
                          class="form-select float-end w-50 form-select-lg"
                          name=""
                          id=""
                        >
                          <option disabled selected>Select one</option>
                          <option value="">Visualiser</option>
                          <option value="">Supprimer</option>
                          <option value="">Modifier</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>Tiger</td>
                      <td>Nixon</td>
                      <td>
                        <span class="badge bg-success">ADMIN</span
                        ><span class="badge bg-warning">USER</span>
                      </td>
                      <td class="">
                        <select
                          class="form-select float-end w-50 form-select-lg"
                          name=""
                          id=""
                        >
                          <option disabled selected>Select one</option>
                          <option value="">Visualiser</option>
                          <option value="">Supprimer</option>
                          <option value="">Modifier</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
