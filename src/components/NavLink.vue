<template>
  <router-link :to="this.navData.link" class="nav-link fw-bold px-3 active">
    <span class="me-2"> <i :class="this.navData.icon"></i></span>
    <span class="">{{this.navData.title}}</span>
  </router-link>
</template>

<script>
export default {
  props: ["linkData"],
    data() {
      return {
        navData:this.linkData
      }
    },
};
</script>