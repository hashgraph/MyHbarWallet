<template>
    <div class="account-tile-button" v-on="this.$listeners">
        <!--fixme: can remove div: tile-image if image sizes are normalized-->
        <img class="tile-image" :src="image" />
        <div class="tile-content">
            <div class="title">{{ title }}</div>
            <div class="content">{{ content }}</div>
            <div class="note">{{ note }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        title: { type: String, required: true },
        content: { type: String, required: false, default: "" },
        note: { type: String, required: false, default: "" },
        image: { type: String, default: null }
    }
});
</script>

<style lang="postcss" scoped>
.title {
    color: var(--color-washed-black);
    font-size: 20px;
    font-weight: 500;
    padding-block-end: 5px;
    padding-block-start: 5px;
}

.content {
    color: var(--color-china-blue);
    font-size: 14px;
}

.note {
    color: var(--color-sunkist-coral);
    font-size: 11px;
    margin-block-start: 5px;
}

.account-tile-button {
    background-color: var(--color-white);
    border-radius: 4px;
    cursor: pointer;
    padding-block: 10px 25px;
    padding-inline: 15px;

    /* stylelint-disable-next-line plugin/no-low-performance-animation-properties */
    transition: background-color, transform 0.3s ease;

    @media screen and (prefers-reduced-motion: reduce) {
        transition: none;
    }
}

.tile-image {
    padding-block: 17.5px;
}
</style>
