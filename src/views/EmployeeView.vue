<script>
import Navbar from "@/components/NavBar.vue";
import Offcanvas from "@/components/OffCanvas.vue";
import Titlebar from "@/components/TitleBar.vue";
import EmployeeComponent from "@/components/EmployeeComponent.vue";
import FunctionComponent from "@/components/FunctionComponent.vue";

export default {
  components: { Navbar, Offcanvas, Titlebar, EmployeeComponent, FunctionComponent },
  data() {
    return { navEmp: true, navFunc: false };
  },
  computed: {},
  methods: {
    toggleNav(nav) {
      if (nav == "emp") {
        this.navEmp = !this.navEmp;
        this.navFunc = !this.navFunc;
      } else {
        this.navEmp = !this.navEmp;
        this.navFunc = !this.navFunc;
      }
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
        <Titlebar title="Employées / Fonctions" />

        <nav class="mt-3">
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a
                class="nav-link x"
                :class="this.navEmp ? 'active' : ''"
                @click="toggleNav('emp')"
                aria-current="page"
                href="#"
                >Employées</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link x"
                :class="this.navFunc ? 'active' : ''"
                @click="toggleNav('func')"
                href="#"
                >Fonctions</a
              >
            </li>
          </ul>
        </nav>

        <div>
          <EmployeeComponent
            class="tab-pane fade show active"
            id="home-tab-pane"
            role="tabpanel"
            aria-labelledby="home-tab"
            tabindex="0"
            :class="this.navEmp ? 'tab-pane fade show' : ''"
            v-if="this.navEmp"
          />
          <FunctionComponent
            :class="this.navFunc ? 'tab-pane fade show' : ''"
            v-if="this.navFunc"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<style scope>
.nav-link.x {
  color: black !important;
}
</style>
