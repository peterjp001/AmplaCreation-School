<script>
import ModalCloseButton from "./ModalCloseButton.vue";

export default {
  props: ["title"],
  components: { ModalCloseButton },
};
</script>
<template>
  <div class="modal-header">
    <h5 class="modal-title" id="staticBackdropLabel">{{ this.title }}</h5>
    <ModalCloseButton />
  </div>
</template>
