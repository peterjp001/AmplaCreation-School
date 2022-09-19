<script>
import Navbar from "@/components/NavBar.vue";
import Offcanvas from "@/components/OffCanvas.vue";
import Titlebar from "@/components/TitleBar.vue";

export default {
  components: { Navbar, Offcanvas, Titlebar },
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
        <Titlebar title="Cours" />

        <div class="card shadow mt-3 p-2">
          <div class="row row-cols-12 mt-2"></div>
        </div>

        <div class="row row-cols-12 mt-2">
          <div class="col pb-2"></div>
        </div>
      </div>
    </main>
  </div>
</template>
