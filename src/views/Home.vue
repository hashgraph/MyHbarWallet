<template>
    <div class="home">
        <FAQs />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import FAQs from "@/components/FAQs.vue";

export default Vue.extend({
    name: "Home",
    components: {
        FAQs
    }
});
</script>

<style lang="postcss" scoped>
.home {
    display: flex;
    flex-direction: column;
}
</style>
