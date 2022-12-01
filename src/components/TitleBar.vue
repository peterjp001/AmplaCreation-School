<script>
export default {
  props: ["title"],
  data() {
    return { academicYear: null };
  },
  computed: {
    getAcademicYears() {
      return this.$store.getters.getListAcademicYear;
    },
    getAcademicYear() {
      return this.$store.getters.getAcademicYear;
    },
  },
  methods: {
    setAY(event) {
      localStorage.setItem("academicYear", event.target.value);
      this.$store.dispatch("reSetAcademicYear", localStorage.getItem("academicYear"));
    },
    goBack() {
      this.$router.go(-1);
    },
  },

  mounted() {
    if (this.getAcademicYears.length == 0) {
      this.$store.dispatch("fetchAcademicYears");
    }
    if (localStorage.getItem("academicYear") == null) {
      this.getAcademicYears.forEach((ay) => {
        if (ay.status == "active") localStorage.setItem("academicYear", ay.id);
      }); 

      this.$store.dispatch("reSetAcademicYear", localStorage.getItem("academicYear"));
    } else {
      this.$store.dispatch("reSetAcademicYear", localStorage.getItem("academicYear"));
    }
  },
};
</script>
<template>
  <div class="row shadow bg-danger">
    <div class="col-md-12 bg-light fw-bold fs-5 p-1 px-3 d-flex justify-content-between">
      <div>
        <button class="btn btn-sm btn-primary me-3 rounded-circle" @click="goBack">
        <i class="bi bi-arrow-left-circle fs-6"></i>
        </button>
        <span>{{ this.title }}</span>
      </div>
      <div
        class="d-flex"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Année académique"
      >
        <p class="fs-6">Annee:</p>
        <select class="form-select ms-2" @change="setAY($event)">
          <option
            v-for="ay in this.getAcademicYears"
            :key="ay.id"
            :value="ay.id"
            :selected="ay.id == this.getAcademicYear"
          >
            {{
              new Date(ay.dateStart).getFullYear() +
              "-" +
              new Date(ay.dateEnd).getFullYear()
            }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
