<template>
    <div class="home">
        <Warning title="NOT RECOMMENDED">
            This is not a recommended way to access your wallet. Due to the
            sensitivity of the information involved, these options should only
            be used in offline settings by experienced users.
        </Warning>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Warning from "../components/Warning.vue";

export default Vue.extend({
    name: "Home",
    components: {
        Warning
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
