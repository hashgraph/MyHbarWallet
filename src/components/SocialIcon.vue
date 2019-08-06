<template>
    <a
        class="social-icon"
        :href="href"
        target="_blank"
        rel="noopener noreferrer"
    >
        <div class="link-content">
            <slot><img :src="logo" alt="<Default Icon>"/></slot>
            {{ name }}
        </div>
    </a>
</template>

<script lang="ts">
import Vue from "vue";
import logo from "@/assets/logo.png";

export default Vue.extend({
    name: "Feature",
    props: {
        href: { type: String, required: false, default: "" },
        name: { type: String, required: true }
    },
    computed: {
        logo() {
            return logo;
        }
    }
});
</script>

<style lang="postcss" scoped>
.social-icon {
    min-width: 80px;
    padding-block-end: 20px;
    text-decoration: none;
}

.link-content {
    color: var(--color-basalt-grey);
    display: flex;
    flex-flow: column nowrap;
    font-size: 14px;
    margin-inline-start: 40px;
    text-align: center;

    & :first-child {
        border-radius: 100%;
        height: 64px;
        margin: 0 auto 9px;
        width: 64px;
    }
}
</style>
