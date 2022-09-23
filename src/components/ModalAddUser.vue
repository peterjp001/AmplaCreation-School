<script>
import ModalContainer from "@/components/modal/ModalContainer.vue";
import ModalOpenButton from "@/components/modal/ModalOpenButton.vue";
import ModalHeader from "@/components/modal/ModalHeader.vue";
import ModalBody from "@/components/modal/ModalBody.vue";
import ModalFooter from "@/components/modal/ModalFooter.vue";
import ModalDialog from "@/components/modal/ModalDialog.vue";
import SubmitButton from "@/components/button/SubmitButton.vue";
import { addUser } from "../service/userservice.js";
import { NotyfMessage } from "../utilities";
import RequestMessage from "./RequestMessage.vue";
export default {
  components: {
    ModalContainer,
    ModalOpenButton,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalDialog,
    SubmitButton,
    RequestMessage,
  },
  data() {
    return { username: "", password: "", confirmation: "", roles: [] };
  },
  methods: {
    isUserHasRole(roles, role) {
      let stmt = null;
      roles.forEach((r) => {
        if (r.roleName == role) {
          stmt = r.roleName;
        }
      });

      return stmt;
    },
    onChange(role, $event) {
      // const index = this.job.xmlOnline.findIndex((v) => v == value);
      const checked = $event.target.checked;
      if (checked) {
        if (this.isUserHasRole(this.roles, role) == null) {
          this.roles.push({ roleName: role });
        }
      } else {
        const myarr = this.roles;
        for (let i = 0; i < myarr.length; i++) {
          if (myarr[i].roleName === role) myarr.splice(i, 1);
        }
      }
    },
    saveUser() {
      let user = { username: this.username, password: this.password, roles: this.roles };
      addUser(user)
        .then((res) => {
          console.log(res);
          this.$store.dispatch("fetchUsers");
          NotyfMessage("Utilisateur Ajouté", "success");
          window.$("#addUser").modal("hide");
        })
        .catch((err) => {
          if (err.response.status == 400) {
            NotyfMessage(err.response.data.errorMessage, "error");
          }
        });
    },
  },
};
</script>

<template>
  <div>
    <ModalOpenButton class="btn btn-sm btn-primary mx-1" modalAction="addUser">
      <span class="bi bi-person-plus"></span>
      <span>Nouveau Utilisateur</span>
    </ModalOpenButton>
    <ModalContainer modalAction="addUser">
      <ModalDialog>
        <ModalHeader title="Nouveau Utilisateur" />
        <ModalBody>
          <RequestMessage
            class="text-center"
            type="danger"
            message="Les mots de passe ne correspondent pas!"
            v-if="password !== confirmation"
          />
          <div class="mb-3">
            <label for="">Nom Utilisateur</label>
            <input
              type="text"
              @input="(event) => (username = event.target.value.trim())"
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label for="">Mot de passe</label>
            <input
              type="password"
              @input="(event) => (password = event.target.value.trim())"
              class="form-control"
              :class="password !== confirmation ? 'is-invalid' : ''"
            />
          </div>
          <div class="mb-3">
            <label for="">Confirmation</label>
            <input
              type="password"
              @input="(event) => (confirmation = event.target.value.trim())"
              class="form-control"
              :class="confirmation !== password ? 'is-invalid' : ''"
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
                  @change="onChange('USER', $event)"
                />
              </div>
              <div class="form-check form-check-inline">
                <label class="form-check-label" for="ADMIN">ADMIN</label>
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="ADMIN"
                  @change="onChange('ADMIN', $event)"
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <SubmitButton
            id="add"
            class="btn-primary"
            name="Sauvegarder"
            @click="saveUser()"
            :disabled="
              (password == null && confirmation == null) ||
              (confirmation == '' && password == '') ||
              confirmation != password ||
              roles.length == 0
            "
          />
        </ModalFooter>
      </ModalDialog>
    </ModalContainer>
  </div>
</template>
