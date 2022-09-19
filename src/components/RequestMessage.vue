<script>
export default {
  props: ["message", "type"],
};
</script>
<template>
  <div class="alert alert-{{this.type}} alert-dismissible fade show" role="alert">
    <span>{{ this.message }}</span>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
</template>
