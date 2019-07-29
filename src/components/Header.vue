<template>
    <div
        v-scroll="onScroll"
        :class="{ scrolled: isScrolled }"
        class="header-container"
    >
        <header>
            <router-link to="/" class="link">
                <div class="logo">MHW</div>
            </router-link>
            <div class="spacer"></div>
            <div class="header-links">
                <router-link to="" class="link">Home</router-link>
                <router-link to="" class="link">About</router-link>
                <router-link to="" class="link">FAQs</router-link>
            </div>
        </header>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "Header",
    data() {
        return {
            isScrolled: false
        };
    },
    directives: {
        scroll: {
            inserted(el, binding) {
                window.addEventListener("scroll", binding.value);
            }
        }
    },
    methods: {
        onScroll() {
            if (window.scrollY > 100) {
                this.isScrolled = true;
            } else if (window.scrollY < 80) {
                this.isScrolled = false;
            }
        }
    }
});
</script>

<style scoped>
.header-container {
    background-color: white;
    position: sticky;
    top: 0;
    transition: all 0.3s ease;
    z-index: 1;

    /* Don't believe IntelliJ, this is totally being used */
    &.scrolled {
        box-shadow: 0 2px 13px rgba(0, 0, 0, 0.1);
    }
}

.scrolled header {
    padding-top: 3px;
    padding-bottom: 3px;
}

header {
    display: flex;
    padding: 12px 25px;
    max-width: 1024px;
    margin: 0 auto;
    transition: all 0.3s ease;
}

.link {
    text-decoration: none;
    color: var(--color-china-blue);

    &:hover {
        cursor: pointer;
    }
}

.header-links {
    display: flex;
    font-size: 14px;

    & .link {
        padding: 7px 14px;
        margin-inline-start: 26px;
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
