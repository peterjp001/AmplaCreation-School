<script>
import SubmitButton from "@/components/button/SubmitButton.vue";
import Message from "@/components/RequestMessage.vue";
import { mapGetters, mapActions } from "vuex";
import { authUser, getProfile } from "../httpRequest/userRequest";

export default {
  components: { SubmitButton, Message },

  data() {
    return { username: "", password: "", message: "", type: "" };
  },
  computed: { ...mapGetters(["getLoadingState", "getAccessToken", "getRefreshToken"]) },

  methods: {
    ...mapActions(["attemptUserprofile"]),

    login() {
      if (this.password.trim() && this.username.trim()) {
        if (localStorage.getItem("accessToken") != null) {
          localStorage.removeItem("accessToken");
        }
        this.$store.dispatch("loadingState", true);

        authUser({ username: this.username, password: this.password })
          .then((response) => {
            this.$store.dispatch("loadingState", false);
            localStorage.setItem("accessToken", response.data.access_token);
            localStorage.setItem("refreshToken", response.data.refresh_token);
            getProfile().then((res) => {
              localStorage.setItem("userData", JSON.stringify(res.data));
              this.$store.dispatch(
                "attemptUserProfile",
                localStorage.getItem("userData")
              );
              this.$router.push("/");
            });
          })

          .catch(() => {
            this.$store.dispatch("loadingState", false);
            this.message = "Email Ou Mot De Passe Incorrect";
            this.type = "danger";
          });
      } else {
        this.message = "Remplire Les Champs Vide";
        this.type = "danger";
      }
    },
  },
};
</script>

<template>
  <div class="appLogin text-center">
    <main class="form-signin w-100 m-auto">
      <form class="bg-light p-2 rounded" v-on:submit.prevent="login">
        <img
          class="mb-4"
          src="../assets/images/ic_school_128_28729.png"
          alt=""
          width="72"
          height="57"
        />
        <h1 class="h3 mb-3 fw-normal text-muted">Notre Dames De Loudres</h1>
        <Message
          :type="this.type"
          :message="this.message"
          v-if="this.type && this.message"
        />
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="JetLee"
            v-model="username"
          />
          <label for="floatingInput">Username</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            v-model="password"
          />
          <label for="floatingPassword">Password</label>
        </div>
        <SubmitButton
          class="btn-primary w-100"
          name="Connection"
          :state="this.getLoadingState"
        />
        <p class="mt-5 mb-3 text-muted">&copy;2022</p>
      </form>
    </main>
  </div>
</template>

<style scoped>
html,
.appLogin {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #2a2a32;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>
