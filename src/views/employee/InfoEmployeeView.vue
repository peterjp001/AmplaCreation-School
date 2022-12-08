<script>
import Navbar from "@/components/NavBar.vue";
import Offcanvas from "@/components/OffCanvas.vue";
import Titlebar from "@/components/TitleBar.vue";
import EmployeeInformations from "@/components/EmployeeInformations.vue";
import EmployeeTeacherInfo from "@/components/EmployeeTeacherInfo.vue";
import EmployeeAccountUserInfo from "@/components/EmployeeAccountUserInfo.vue";

export default {
  props: ["employee_id"],
  components: {
    Navbar,
    Offcanvas,
    Titlebar,
    EmployeeInformations,
    EmployeeTeacherInfo,
    EmployeeAccountUserInfo,
  },
  data() {
    return { navEmp: true, navAccount: false, navTeacher: false };
  },
  computed: {
    getEmployee() {
      return this.$store.getters.getEmployee;
    },
    getFunctions() {
      return this.$store.getters.getListFunctions;
    },
  },
  methods: {
    isUserHasFunction(funcs, func) {
      let stmt = null;
      if (funcs != null) {
        funcs.forEach((f) => {
          if (f.functionName == func) {
            stmt = f.functionName;
          }
        });
      }
      return stmt;
    },
    toggleNav(nav) {
      if (nav == "emp") {
        this.navEmp = true;
        this.navAccount = false;
        this.navTeacher = false;
      } else if (nav == "account") {
        this.navEmp = false;
        this.navAccount = true;
        this.navTeacher = false;
      } else {
        this.navEmp = false;
        this.navAccount = false;
        this.navTeacher = true;
      }
    },
  },
  mounted() {
    this.$store.dispatch("fetchEmployee", this.employee_id);
  },
};
</script>

<template>
  <div v-if="this.getEmployee">
    <Navbar />

    <Offcanvas />

    <main class="mt-5">
      <div class="container-fluid">
        <Titlebar
          :title="`Employé: ${this.getEmployee.firstName} ${this.getEmployee.lastName} 
            |      Code:  ${this.getEmployee.codeEmployee}`"
        />

        <nav class="mt-3">
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a
                class="nav-link x"
                :class="this.navEmp ? 'active' : ''"
                @click="toggleNav('emp')"
                aria-current="page"
                href="#"
                >Info Employée</a
              >
            </li>
            <li
              class="nav-item"
              v-if="
                isUserHasFunction(this.getEmployee.functions, 'Professeur') ==
                'Professeur'
              "
            >
              <a
                class="nav-link x"
                :class="this.navTeacher ? 'active' : ''"
                @click="toggleNav('teacher')"
                href="#"
                >Info Professeur
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link x"
                :class="this.navAccount ? 'active' : ''"
                @click="toggleNav('account')"
                href="#"
                >Compte Utilisateur
              </a>
            </li>
          </ul>
        </nav>
        <div>
          <EmployeeInformations
            :employeeId="this.employee_id"
            :employeeData="this.getEmployee"
            class="tab-pane fade show active"
            id="home-tab-pane"
            role="tabpanel"
            aria-labelledby="home-tab"
            tabindex="0"
            :class="this.navEmp ? 'tab-pane fade show' : ''"
            v-if="this.navEmp"
          />
          <EmployeeTeacherInfo
            :class="this.navTeacher ? 'tab-pane fade show' : ''"
            v-if="this.navTeacher"
          />
          <EmployeeAccountUserInfo
            :class="this.navAccount ? 'tab-pane fade show' : ''"
            v-if="this.navAccount"
          />
        </div>
      </div>
    </main>
  </div>
</template>
