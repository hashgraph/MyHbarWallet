<template>
    <div class="home">
        <div class="top">
            <HomeTileButtons />
        </div>
        <FAQs />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import FAQs from "../components/FAQs.vue";
import HomeTileButtons from "../components/HomeTileButtons.vue";

export default Vue.extend({
    name: "Home",
    components: {
        FAQs,
        HomeTileButtons
    },
    computed: {}
});
</script>

<style lang="postcss" scoped>
.home {
    display: flex;
    flex-direction: column;

    @media (max-width: 414px) {
        align-items: stretch;
    }
}

.top {
    align-items: center;
    align-self: center;
    display: flex;
    flex-direction: column;
    max-width: 1024px;

    @media (min-width: 1025px) {
        /* fixme: remove 80px when there is more content */
        padding: 80px 20px;
    }

    @media (max-width: 1024px) and (min-width: 415px) {
        /* fixme: remove 80px when there is more content */
        padding: 80px 25px;
    }

    @media (max-width: 1024px) {
        /* fixme: remove 80px when there is more content */
        padding: 80px 25px;
    }
}
</style>
