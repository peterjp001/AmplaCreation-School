<script>
export default { props: ["modalAction"] };
</script>
<template>
  <button type="button" data-bs-toggle="modal" :data-bs-target="'#' + this.modalAction">
    <slot></slot>
  </button>
</template>
