<script>
import Navbar from "@/components/NavBar.vue";
import Offcanvas from "@/components/OffCanvas.vue";
import Titlebar from "@/components/TitleBar.vue";
import SubmitButton from "@/components/button/SubmitButton.vue";
import { mapGetters } from "vuex";
import { Notyf } from "notyf";
import axios from "axios";
const notyf = new Notyf();

export default {
  components: { Navbar, Offcanvas, Titlebar, SubmitButton },
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
      axios
        .put(
          `user/${this.getUserInfo.id}`,
          { password: this.password },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        )
        .then((res) => {
          if (res.status == 200) notyf.success(`Mot de passe modifié`);
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
            axios
              .put(
                `user/${this.getUserInfo.id}`,
                { username: username },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                  },
                }
              )
              .then((res) => {
                console.log(res.data.id);
                this.$store.dispatch("fetchUser", res.data.id);
                if (res.status == 200) notyf.success(`Nom utilisateur modifié`);
              });
          } else {
            notyf.error(`Nom utilisateur ne peut pas etre vide`);
          }
        }, 2000);
      }
    },

    async onChange(role, user, $event) {
      this.roles = this.getUserInfo.roles;
      // const index = this.job.xmlOnline.findIndex((v) => v == value);
      const checked = $event.target.checked;
      if (checked) {
        axios
          .post(`addroletouser/user/${user}/role/${role}`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
          })
          .then((res) => {
            if (res.status == 200) notyf.success(`Role ${role} Ajouté a ${user}`);
          });
      } else {
        axios
          .post(`removeroletouser/user/${user}/role/${role}`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
          })
          .then((res) => {
            if (res.status == 200) notyf.success(`Role ${role} enlevé a ${user}`);
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
              <div class="border-bottom">
                <h5 class="fw-bold">Informations Utilisateurs</h5>
              </div>
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
                        @input="updateUsername"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="" class="text-dark">Roles: </label>
                      <div class="">
                        <div class="form-check form-check-inline">
                          <label class="form-check-label" for="USER">USER</label>
                          <input
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
                    <div class="mb-3">
                      <label for="" class="form-label">Mot De Passe </label>
                      <input
                        type="password"
                        class="form-control w-75"
                        :value="password"
                        @input="(event) => (password = event.target.value.trim())"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="" class="form-label">Confirmation </label>
                      <input
                        type="password"
                        class="form-control w-75"
                        :value="confirmation"
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
