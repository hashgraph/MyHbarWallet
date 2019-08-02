<template>
    <div class="wrapper">
        <transition
            v-enter-active="transition"
            v-leave-active="transition"
            name="menu"
        >
            <nav v-if="openCheck">
                <li class="link-block">
                    <a href="/">
                        <div class="link">Home</div>
                        <FontAwesomeIcon
                            class="icon"
                            :icon="faAngleRight"
                        ></FontAwesomeIcon>
                    </a>
                </li>
                <li class="link-block">
                    <a href="/#about">
                        <div class="link">About</div>
                        <FontAwesomeIcon
                            class="icon"
                            :icon="faAngleRight"
                        ></FontAwesomeIcon>
                    </a>
                </li>
                <li class="link-block">
                    <a href="/#faqs">
                        <div class="link">FAQs</div>
                        <FontAwesomeIcon
                            class="icon"
                            :icon="faAngleRight"
                        ></FontAwesomeIcon>
                    </a>
                </li>
            </nav>
        </transition>
        <transition v-enter-active="fade" name="shadoow">
            <div v-if="openCheck" class="shadow-backdrop"></div>
        </transition>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default Vue.extend({
    name: "HamburgerMenu",
    components: {
        FontAwesomeIcon
    },
    props: {
        isOpen: { type: Boolean }
    },
    data() {
        return {
            viewWidth: 0
        };
    },
    computed: {
        openCheck() {
            if (this.isOpen && this.viewWidth <= 1025) return true;
            else return false;
        },
        faAngleRight() {
            return faAngleRight;
        },
        transition() {
            if (this.isOpen) return "menu-enter-active";
            else return "menu-leave-active";
        },
        fade() {
            return "shadow-active";
        }
    },
    created() {
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener("resize", this.handleResize);
    },
    methods: {
        handleResize() {
            this.viewWidth = window.innerWidth;
        }
    }
});
</script>

<style lang="postcss" scoped>
nav {
    background-color: var(--color-white);
    height: 100vh;
    width: 100vw;
    z-index: 998;
}

.shadow-backdrop {
    background-color: #000;
    height: 100vh;
    opacity: 0.8;
    width: 100vw;
    z-index: 990;
}

.link-block {
    align-items: center;
    border-bottom: 1px solid var(--color-peral);
    cursor: pointer;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    list-style: none;
    padding: 25px;
    padding-inline-start: 13px;
}

.icon {
    margin-inline-start: auto;
}

a {
    align-items: center;
    color: var(--color-washed-black);
    display: flex;
    flex-grow: 1;
    text-decoration: none;

    &:active,
    &:hover,
    &:link,
    &:active,
    &:focus,
    &:link {
        color: var(--color-celestial-green);
    }
}

@media screen and (prefers-reduced-motion: reduce) {
    .menu-enter-active {
        animation: none;
    }
}

.menu-enter-active {
    animation: animate 0.2s ease;
}

@media screen and (prefers-reduced-motion: reduce) {
    .menu-leave-active {
        animation: none;
    }
}

.menu-leave-active {
    animation: animate 0.2s ease reverse;
}

@media screen and (prefers-reduced-motion: reduce) {
    .shadow-active {
        animation: none;
    }
}

.shadow-active {
    animation: fade-in 0.2s ease;
    background-color: #000;
    height: 100vh;
}

@keyframes fade-in {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes animate {
    0% {
        transform: scaleY(0);
        transform-origin: top;
    }

    100% {
        transform: scaleY(1);
        transform-origin: top;
    }
}
</style>
