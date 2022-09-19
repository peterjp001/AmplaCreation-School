<script>
export default {
  props: ["cardData"],
  data() {
    return {};
  },
};
</script>
<template>
  <RouterLink :to="this.cardData.link" class="text-decoration-none">
    <div class="card mb-3 shadow">
      <div class="card-body">
        <div class="row acc-text">
          <div class="col-sm-7 text-center">
            <h5>{{ this.cardData.title }}</h5>
            {{ this.cardData.quantity }}
          </div>
          <div class="col-sm-5 text-center">
            <i :class="this.cardData.icon" style="font-size: 50px"></i>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
