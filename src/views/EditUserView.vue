<script>
import Navbar from "@/components/NavBar.vue";
import Offcanvas from "@/components/OffCanvas.vue";
import Titlebar from "@/components/TitleBar.vue";
import SubmitButton from "@/components/button/SubmitButton.vue";
import { mapGetters } from "vuex";
export default {
  components: { Navbar, Offcanvas, Titlebar, SubmitButton },
  props: ["user_id"],
  data() {
    return {
      username: null,
      roles: [],
      password: null,
      confirmation: null,
      admin: "ADMIN",
      user: "USER",
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  methods: {
    updateUsernameRole() {
      console.log(this.username);
      console.log(this.roles);
    },
    updateUserPassword() {
      // console.log(this.password);
      // console.log(this.confirmation);
      console.log(this.isUserHasRole(this.getUserInfo.roles, "ADMIN"));
    },

    isUserHasRole(roles, role) {
      let stmt = null;
      roles.forEach((r) => {
        if (r.roleName == role) {
          stmt = r.roleName;
        }
      });

      return stmt;
    },
  },
  mounted() {
    this.$store.dispatch("fetchUser", this.user_id);
  },
};
</script>

<template>
  <div v-if="this.getUserInfo">
    <Navbar />

    <Offcanvas />

    <main class="mt-5">
      <div class="container-fluid">
        <Titlebar :title="'Utilisateur: ' + this.getUserInfo.username" />

        <div class="card shadow mt-3 p-2">
          <div class="row mt-2">
            <div class="col-12">
              <div class="border-bottom"><h5 class="fw-bold">UserInfo</h5></div>
            </div>
            <div class="col-12 mt-2">
              <div class="row">
                <div class="col-sm-6 mb-3">
                  <form v-on:submit.prevent="updateUsernameRole">
                    <div class="mb-3">
                      <label for="" class="form-label">Nom Utilisateur</label>
                      <input
                        type="text"
                        class="form-control w-75"
                        :value="this.getUserInfo.username"
                        @input="(event) => (username = event.target.value)"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="" class="text-dark">Roles: </label>
                      <div class="text-light">
                        <div class="form-check form-check-inline">
                          <label class="form-check-label bg-warning p-1" for="USER"
                            >USER</label
                          >
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="USER"
                            :value="this.user"
                            v-model="user"
                            :checked="this.user != null"
                          />
                        </div>
                        <div class="form-check form-check-inline">
                          <label class="form-check-label bg-success p-1" for="ADMIN"
                            >ADMIN</label
                          >
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="ADMIN"
                            :value="this.admin"
                            v-model="roles"
                            :checked="true == true"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="mb-3">
                      <SubmitButton class="btn-primary" name="Modifier" />
                    </div>
                  </form>
                </div>
                <div class="col-sm-6 mb-3">
                  <form v-on:submit.prevent="updateUserPassword">
                    <div class="mb-3">
                      <label for="" class="form-label">Mot De Passe</label>
                      <input type="text" class="form-control w-75" v-model="password" />
                    </div>
                    <div class="mb-3">
                      <label for="" class="form-label">Confirmation</label>
                      <input
                        type="text"
                        class="form-control w-75"
                        v-model="confirmation"
                      />
                    </div>
                    <div class="mb-3">
                      <SubmitButton class="btn-primary" name="Modifier" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
