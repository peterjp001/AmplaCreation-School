<script>
import Navbar from "@/components/NavBar.vue";
import Offcanvas from "@/components/OffCanvas.vue";
import Titlebar from "@/components/TitleBar.vue";
import SubmitButton from "@/components/button/SubmitButton.vue";
// import ModalDeleteUser from "@/components/ModalConfirmDeleteUser.vue";
import { mapGetters } from "vuex";
import { NotyfMessage } from "../../utilities";
import RequestMessage from "@/components/RequestMessage.vue";
import {
  updateUser,
  addRoleToUser,
  removeRoleToUser,
} from "../../httpRequest/userRequest.js";

export default {
  components: {
    Navbar,
    Offcanvas,
    Titlebar,
    SubmitButton,
    // ModalDeleteUser,
    RequestMessage,
  },
  props: ["user_id"],
  data() {
    return {
      username: null,
      password: null,
      confirmation: null,
      admin: "ADMIN",
      user: "USER",
      roles: {},
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  methods: {
    updateUserPassword() {
      updateUser(this.getUserInfo.id, { password: this.password }).then((res) => {
        if (res.status == 200) NotyfMessage(`Mot de passe modifié`, "success");
        this.password = null;
        this.confirmation = "";
      });
    },
    updateUsername(event) {
      const username = event.target.value;

      if (username.trim() != this.getUserInfo.username) {
        clearTimeout(this.debounce);
        this.debounce = setTimeout(() => {
          if (username.trim() != "") {
            updateUser(this.getUserInfo.id, { username: username })
              .then((res) => {
                this.$store.dispatch("fetchUser", res.data.id);
                if (res.status == 200) NotyfMessage(`Nom utilisateur modifié`, "success");
              })
              .catch((err) => {
                if (err.response.status == 400) {
                  NotyfMessage(err.response.data.errorMessage, "error");
                }
              });
          } else {
            NotyfMessage(`Nom utilisateur ne peut pas etre vide`, "error");
          }
        }, 1500);
      }
    },

    async onChange(role, user, $event) {
      this.roles = this.getUserInfo.roles;
      const checked = $event.target.checked;
      if (checked) {
        addRoleToUser(role, user).then((res) => {
          if (res.status == 200) NotyfMessage(`Role ${role} Ajouté a ${user}`, "success");
        });
      } else {
        removeRoleToUser(role, user).then((res) => {
          if (res.status == 200) NotyfMessage(`Role ${role} enlevé a ${user}`, "success");
        });
      }
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
              <div class="border-bottom d-flex justify-content-between">
                <h5 class="fw-bold">Informations Utilisateurs</h5>
                <div class="p-2">
                  <!-- <ModalDeleteUser :userData="this.getUserInfo" /> -->
                </div>
              </div>
            </div>
            <div class="col-12 mt-2">
              <div class="row">
                <div class="col-sm-6 mb-3">
                  <form v-on:submit.prevent="updateUsernameRole">
                    <div class="mb-3">
                      <label for="" class="form-label">Nom Utilisateur</label>
                      <input
                        :disabled="this.getUserInfo.username == 'JohnDoe'"
                        type="text"
                        class="form-control w-75"
                        :value="this.getUserInfo.username"
                        @input="updateUsername"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="" class="text-dark">Roles: </label>
                      <div class="">
                        <div class="form-check form-check-inline">
                          <label class="form-check-label" for="USER">USER</label>
                          <input
                            :disabled="this.getUserInfo.username == 'JohnDoe'"
                            class="form-check-input"
                            type="checkbox"
                            id="USER"
                            :checked="this.isUserHasRole(this.getUserInfo.roles, 'USER')"
                            @change="onChange('USER', this.getUserInfo.username, $event)"
                          />
                        </div>
                        <div class="form-check form-check-inline">
                          <label class="form-check-label" for="ADMIN">ADMIN</label>
                          <input
                            :disabled="this.getUserInfo.username == 'JohnDoe'"
                            class="form-check-input"
                            type="checkbox"
                            id="ADMIN"
                            :checked="this.isUserHasRole(this.getUserInfo.roles, 'ADMIN')"
                            @change="onChange('ADMIN', this.getUserInfo.username, $event)"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="col-sm-6 mb-3">
                  <form v-on:submit.prevent="updateUserPassword">
                    <RequestMessage
                      class="text-center w-75"
                      type="danger"
                      message="Les mots de passe ne correspondent pas!"
                      v-if="
                        confirmation != null &&
                        password != null &&
                        confirmation != password
                      "
                    />
                    <div class="mb-3">
                      <label for="" class="form-label">Mot De Passe </label>
                      <input
                        :disabled="this.getUserInfo.username == 'JohnDoe'"
                        type="password"
                        class="form-control w-75"
                        @input="(event) => (password = event.target.value.trim())"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="" class="form-label">Confirmation </label>
                      <input
                        :disabled="this.getUserInfo.username == 'JohnDoe'"
                        type="password"
                        class="form-control w-75"
                        @input="(event) => (confirmation = event.target.value.trim())"
                      />
                    </div>
                    <div
                      class="mb-3"
                      v-if="
                        password != null &&
                        password != '' &&
                        confirmation != null &&
                        confirmation != '' &&
                        confirmation === password
                      "
                    >
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
