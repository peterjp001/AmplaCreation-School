<script>
export default { props: ["modalAction"] };
</script>
<template>
  <div
    class="modal fade"
    :id="this.modalAction"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <slot></slot>
  </div>
</template>
