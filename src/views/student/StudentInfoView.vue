<script>
import Navbar from "@/components/NavBar.vue";
import Offcanvas from "@/components/OffCanvas.vue";
import Titlebar from "@/components/TitleBar.vue";
import ModalEditStudent from "@/components/ModalEditStudent.vue";
import ModalEditStudentAcademicInfo from "@/components/ModalEditStudentAcademicInfo.vue";

export default {
  props: ["register_id"],
  components: {
    Navbar,
    Offcanvas,
    Titlebar,
    ModalEditStudent,
    ModalEditStudentAcademicInfo,
  },
  data() {
    return { navInfo: true, navAy: false };
  },
  computed: {
    getStudentRegister() {
      return this.$store.getters.getStudentRegister;
    },
    getStudent() {
      return this.$store.getters.getStudent;
    },
  },
  methods: {
    toggleNav(nav) {
      if (nav == "emp") {
        this.navInfo = !this.navInfo;
        this.navAy = !this.navAy;
      } else {
        this.navInfo = !this.navInfo;
        this.navAy = !this.navAy;
      }
    },
  },
  mounted() {
    this.$store.dispatch("fetchStudentByStudentId", this.register_id);
    this.$store.dispatch("fetchStudentByStudentIdAndAyId", {
      studentId: this.register_id,
      academicYearId: localStorage.getItem("academicYear"),
    });
  },
};
</script>

<template>
  <div>
    <Navbar />

    <Offcanvas />

    <main class="mt-5">
      <div class="container-fluid">
        <Titlebar title="Informations sur l'élève " />

        <section>
          <div class="container py-4" v-if="this.getStudent">
            <div class="row row-cols-12 mb-2">
              <div class="col d-flex justify-content-end">
                <ModalEditStudent :studentData="this.getStudent" v-if="this.getStudent" />
                <ModalEditStudentAcademicInfo
                  :studentId="this.getStudent.id"
                  :studentData="this.getStudentRegister"
                  v-if="this.getStudentRegister"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-lg-4">
                <div class="card mb-4">
                  <div class="card-body text-center">
                    <img
                      src="../../assets/images/acc-avatar.PNG"
                      alt="avatar"
                      class="rounded-circle img-fluid"
                      style="width: 150px"
                    />
                    <h5 class="my-3">
                      {{ this.getStudent.lastName.toUpperCase() }}
                      {{ this.getStudent.firstName }}
                    </h5>
                    <p class="text-muted mb-1">{{ this.getStudent.codeStudent }}</p>
                  </div>
                </div>
              </div>

              <div class="col-lg-8">
                <div class="card mb-4">
                  <div class="card-body">
                    <p class="mb-4">
                      <span
                        class="text-primary lead font-italic fw-bold me-1 border-bottom"
                        >Informations Personnelles</span
                      >
                    </p>
                    <div class="row">
                      <div class="col-sm-4">
                        <table class="table table-striped">
                          <tbody class="table-group-divider">
                            <tr>
                              <th scope="row">Code:</th>
                              <td>{{ this.getStudent.codeStudent }}</td>
                            </tr>
                            <tr>
                              <th scope="row">Nom:</th>
                              <td>{{ this.getStudent.lastName }}</td>
                            </tr>
                            <tr>
                              <th scope="row">Prénom:</th>
                              <td>{{ this.getStudent.firstName }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div class="col-sm-4">
                        <table class="table table-striped">
                          <tbody class="table-group-divider">
                            <tr>
                              <th scope="row">Adresse:</th>
                              <td>{{ this.getStudent.address }}</td>
                            </tr>
                            <tr>
                              <th scope="row">Date Naissance:</th>
                              <td>{{ this.getStudent.birthDate }}</td>
                            </tr>
                            <tr>
                              <th scope="row">Lieu Naissance:</th>
                              <td colspan="2">{{ this.getStudent.birthPlace }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div class="col-sm-4">
                        <table class="table table-striped">
                          <tbody class="table-group-divider">
                            <tr>
                              <th scope="row">Sexe:</th>
                              <td colspan="2">
                                {{ this.getStudent.sexe.toUpperCase() }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card mb-4">
                  <div class="card-body">
                    <p class="mb-4">
                      <span
                        class="text-primary lead font-italic fw-bold me-1 border-bottom"
                        >Parents & Personnes Responsable</span
                      >
                    </p>
                    <div class="row">
                      <div class="col-sm-6">
                        <table class="table table-striped">
                          <tbody class="table-group-divider">
                            <tr>
                              <th scope="row">Père:</th>
                              <td colspan="2">{{ this.getStudent.fatherFullName }}</td>
                            </tr>
                            <tr>
                              <th scope="row">Sexe:</th>
                              <td colspan="2">{{ this.getStudent.motherFullName }}</td>
                            </tr>
                            <tr>
                              <th scope="row">Personne Responsable:</th>
                              <td colspan="2">
                                {{ this.getStudent.responsiblePersonFullName }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="col-sm-6">
                        <table class="table table-striped">
                          <tbody class="table-group-divider">
                            <tr>
                              <th scope="row">Téléphone Responsable:</th>
                              <td colspan="2">
                                {{ this.getStudent.responsiblePersonPhone }}
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Adresse Responsable:</th>
                              <td colspan="2">
                                {{ this.getStudent.responsiblePersonAddress }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card mb-4" v-if="this.getStudentRegister">
                  <div class="card-body">
                    <p class="mb-4">
                      <span
                        class="text-primary lead font-italic fw-bold me-1 border-bottom"
                        >Informations Académique</span
                      >
                    </p>
                    <div class="row">
                      <div class="col-sm-8">
                        <table class="table table-striped">
                          <tbody class="table-group-divider">
                            <tr>
                              <th scope="row">Derniere Ecole :</th>
                              <td colspan="2">
                                {{ this.getStudentRegister.lastSchool }}
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Derniere Classe :</th>
                              <td colspan="2">{{ this.getStudentRegister.lastGrade }}</td>
                            </tr>
                            <tr>
                              <th scope="row">Classe Actuelle :</th>
                              <td colspan="2">{{ this.getStudentRegister.gradeName }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<style scope>
.nav-link.x {
  color: black !important;
}
</style>
