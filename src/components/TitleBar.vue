<script>
export default {
  props: ["title"],
  data() {
    return {};
  },
};
</script>
<template>
  <div class="row shadow bg-danger">
    <div class="col-md-12 bg-light fw-bold fs-5 p-1 px-3 d-flex justify-content-between">
      <span>{{ this.title }}</span>
      <div class="d-flex">
        <p class="fs-6">Annee:</p>
        <select class="form-select ms-2" name="" id="">
          <option>2022-2023</option>
          <option>2021-2022</option>
          <option>2020-2021</option>
        </select>
      </div>
    </div>
  </div>
</template>
