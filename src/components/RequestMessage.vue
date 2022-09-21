<script>
export default {
  props: ["message", "type"],
};
</script>
<template>
  <div
    class="alert alert-dismissible fade show"
    :class="`alert-` + this.type"
    role="alert"
  >
    {{ this.message }}
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
</template>
