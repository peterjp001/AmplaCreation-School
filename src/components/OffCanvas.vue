<script>
import NavLink from "@/components/NavLink.vue";
export default {
  components: {
    NavLink,
  },

  computed: {
    getUserProfile() {
      return this.$store.getters.getUserProfile;
    },
    getSData() {
      return this.$store.getters.getSideBarData;
    },
  },
  methods: {
    isUserHasrole(urole) {
      let roles = this.getUserProfile.roles;
      let stmt = false;
      if (roles != null) {
        roles.forEach((r) => {
          urole.forEach((ur) => {
            if (r.roleName == ur.roleName) stmt = true;
            else stmt = false;
          });
        });
      }
      return stmt;
    },
    logout() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userData");
      localStorage.removeItem("academicYear");

      this.$router.push("/login");
    },
  },
};
</script>
<template>
  <div>
    <!-- OFFCANVAS -->
    <div
      class="offcanvas offcanvas-start sidebar-nav"
      tabindex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div class="offcanvas-body p-0">
        <ul class="navbar-nav my-1">
          <li>
            <div class="d-flex justify-content-between">
              <a href="#" class="nav-link px-3 active d-inline">
                <img
                  src="../assets/images/acc-avatar.PNG"
                  class="rounded-circle border-color"
                  height="45"
                  alt=""
                  loading="lazy"
                />
                <span class="px-2"> {{ this.getUserProfile.username }} </span>
              </a>
              <a
                href="#"
                @click="logout"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Se déconnecter"
                class="nav-link px-3 active"
              >
                <span> <i class="bi bi-box-arrow-right"></i></span>
              </a>
            </div>
            <hr class="dropdown-divider" />
          </li>

          <li class="my-2" v-for="item in this.getSData" :key="item.index">
            <NavLink :linkData="item" />
          </li>
          <!-- 
          <li class="text-light">
            {{ this.isUserHasrole([{ roleName: "ADD" }, { roleName: "USER" }]) }}
          </li> -->

          <!-- <li class="my-2">
            <a
              class="nav-link px-3 sidebar-link"
              data-bs-toggle="collapse"
              href="#contenu"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <span class="me-2"> <i class="bi bi-people"></i></span>
              <span>Students</span>
              <span class="right-icon ms-auto"><i class="bi bi-chevron-down"></i></span>
            </a>
            <div class="collapse" id="contenu">
              <div></div>
              <ul class="navbar-nav ps-3">
                <li>
                  <a href="" class="nav-link px-3"
                    ><span><i class=" "></i></span> Acc Transfert</a
                  >
                </li>
                <li>
                  <a href="" disabled class="nav-link px-3"
                    ><span><i class=" "></i></span> Mon Cash</a
                  >
                </li>
              </ul>
            </div>
          </li> -->
        </ul>
      </div>
    </div>
    <!-- OFFCANVAS -->
  </div>
</template>
