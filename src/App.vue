<script >
import { RouterView } from "vue-router";
import SpinnerComponent from "@/components/SpinnerComponent.vue"

export default {
    components:{
        RouterView, SpinnerComponent
    },
    mounted() {
        
    },
}
</script>

<template>
    <SpinnerComponent v-if="(1==0)" />
    <RouterView />
</template>
