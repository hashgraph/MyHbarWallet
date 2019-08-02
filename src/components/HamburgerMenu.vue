<template>
    <div>
        <transition
            v-enter-active="transition"
            v-leave-active="transition"
            name="menu"
        >
            <nav v-if="isOpen">
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
        <transition v-enter-active="fade" name="shadow">
            <div v-if="isOpen" class="shadow-backdrop"></div>
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
    computed: {
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
    }
});
</script>

<style lang="postcss" scoped>
nav {
    background-color: var(--color-white);
    height: 100vh;
    position: relative;
    width: 100vw;
    z-index: 999;
}

.shadow-backdrop {
    background-color: #000;
    height: 100vh;
    opacity: 0.8;
    z-index: 999;
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
        height: 100vh;
    }
}

.menu-enter-active {
    animation: animate 0.3s ease;
    height: 100vh;
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
    animation: fade-in 0.1s ease;
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
