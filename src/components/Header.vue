<template>
    <div class="header">
        <router-link to="/" class="link">
            <div class="logo">MHW</div>
        </router-link>
        <div class="spacer"></div>
        <div class="header-links">
            <router-link to="" class="link">Home</router-link>
            <router-link to="" class="link">About</router-link>
            <router-link to="" class="link">FAQs</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "Header"
});
</script>

<style scoped>
.header {
    display: flex;
    padding: 12px 25px;
    max-width: 1024px;
    margin-left: auto;
    margin-right: auto;

    & .link {
        text-decoration: none;
        color: var(--color-china-blue);

        &:hover {
            cursor: pointer;
        }
    }

    & .header-links {
        display: flex;

        & .link {
            padding: 7px 14px;
            margin-left: 26px;
        }
    }
}

.logo {
    font-size: 30px;
    font-weight: bold;
}

.spacer {
    flex-grow: 1;
}
</style>
