<template>
    <div class="create-account">
        <div class="top">
            <AccountTileButtons />
        </div>
        <FAQs />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import FAQs from "../components/FAQs.vue";
import AccountTileButtons from "../components/AccountTileButtons.vue";

export default Vue.extend({
    components: {
        FAQs,
        AccountTileButtons
    },
    computed: {}
});
</script>

<style lang="postcss" scoped>
.create-account {
    display: flex;
    flex-direction: column;
}

.top {
    align-items: center;
    align-self: center;
    display: flex;
    flex-direction: column;
    max-width: 1024px;
}
</style>
