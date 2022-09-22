<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<template>
  <div class="appLogin text-center">
    <div>
      <img
        class="mb-4"
        src="../assets/images/ic_school_128_28729.png"
        alt=""
        width="72"
        height="57"
      /><br />
      <h1 class="h3 mb-3 fw-normal border-bottom">Notre Dames De Loudres</h1>
      <h4 class="">404 Erreur de Page</h4>
      <a @click="goBack" class="btn btn-primary"
        ><i class="bi bi-arrow-left-circle"></i> Retourner</a
      >
    </div>
  </div>
</template>

<style scoped>
html,
.appLogin {
  color: white;
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #2a2a32;
}
</style>
