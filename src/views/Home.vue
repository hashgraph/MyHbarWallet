<template>
    <div class="home">
        <Button label="This Is A Button" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Button from "../components/Button.vue";

export default Vue.extend({
    name: "Home",
    components: {
        Button
    }
});
</script>

<style lang="postcss">
.home {
    align-items: center;
    display: flex;
    flex-direction: column;
}
</style>
