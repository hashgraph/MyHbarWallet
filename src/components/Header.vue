<template>
    <div v-scroll="onScroll" class="header-container">
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
    </div>
</template>

<script lang="ts">
import Vue from "vue";

Vue.directive("scroll", {
    inserted: function(el, binding) {
        let f = function() {
            if (binding.value(el)) {
                window.removeEventListener("scroll", f);
            }
        };
        window.addEventListener("scroll", f);
    }
});

export default Vue.extend({
    name: "Header",
    data() {
        return {
            listener: null
        };
    },
    methods: {
        onScroll: function(el: HTMLElement): boolean {
            if (!el.classList.contains("scrolled") && window.scrollY > 100) {
                el.classList.toggle("scrolled");
            } else if (
                el.classList.contains("scrolled") &&
                window.scrollY < 80
            ) {
                el.classList.toggle("scrolled");
            }
            return false;
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

    /* Don't believe IntelliJ this is totally being used */
    &.scrolled {
        box-shadow: 0 2px 13px rgba(0, 0, 0, 0.1);

        & .header {
            padding-top: 3px;
            padding-bottom: 3px;
        }
    }
}

.header {
    display: flex;
    padding: 12px 25px;
    max-width: 1024px;
    margin-left: auto;
    margin-right: auto;
    transition: all 0.3s ease;

    & .link {
        text-decoration: none;
        color: var(--color-china-blue);

        &:hover {
            cursor: pointer;
        }
    }

    & .header-links {
        display: flex;
        font-size: 14px;

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
