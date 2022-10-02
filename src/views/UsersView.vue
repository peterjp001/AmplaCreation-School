<script>
import Navbar from "@/components/NavBar.vue";
import Offcanvas from "@/components/OffCanvas.vue";
import Titlebar from "@/components/TitleBar.vue";
import ModalAddUser from "@/components/ModalAddUser.vue";
import ModalAddUserToEmployee from "@/components/ModalAddUserToEmployee.vue";
// import { mapGetters } from "vuex";

export default {
  components: { Navbar, Offcanvas, Titlebar, ModalAddUser, ModalAddUserToEmployee },
  data() {
    return {};
  },
  computed: {
    getListUsers() {
      return this.$store.getters.getListUsers;
    },
    getCData() {
      return this.$store.getters.getCardData;
    },
  },
  mounted() {
    this.$store.dispatch("fetchUsers");
  },
};
</script>

<template>
  <div>
    <Navbar />

    <Offcanvas />

    <main class="mt-5">
      <div class="container-fluid">
        <Titlebar title="Utilisateurs" />

        <div class="card shadow mt-3 p-2">
          <div class="row row-cols-5 mt-2">
            <div class="col pb-2">
              <ModalAddUser />
            </div>
            <div class="col pb-2">
              <ModalAddUserToEmployee />
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
                    <tr v-for="user in this.getListUsers" :key="user.index">
                      <td>{{ user.id }}</td>
                      <td>{{ user.username }}</td>
                      <td>
                        <span
                          v-for="role in user.roles"
                          :key="role.id"
                          class="badge mx-1"
                          :class="role.roleName == 'USER' ? 'bg-warning' : 'bg-success'"
                          >{{ role.roleName }}</span
                        >
                      </td>
                      <td class="">
                        <div>
                          <RouterLink :to="`/user/${user.id}`"
                            ><span class="btn btn-sm btn-primary mx-1"
                              ><i class="bi bi-eye"></i></span
                          ></RouterLink>
                        </div>
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
