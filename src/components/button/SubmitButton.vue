<template>
  <button type="submit" class="btn" :disabled="state">
    <span class="spinner-border spinner-border-sm" v-if="state"></span>
    {{ name }}
  </button>
</template>

<script>
export default {
  props: ["name", "state"],
};
</script>
