<template>
    <div class="home">
        <Accordion />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Accordion from "@/components/Accordion.vue";

export default Vue.extend({
    name: "Home",
    components: {
        Accordion
    }
});
</script>

<style lang="postcss" scoped>
.home {
    align-items: center;
    display: flex;
    flex-direction: column;
}
</style>
