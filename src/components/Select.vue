<template>
    <div class="select" :class="{ 'is-open': dropdownOpen }" @click.stop="">
        <div class="select-value-container" @click="toggle">
            <div class="select-value">{{ selected }}</div>
            <MaterialDesignIcon class="icon" :icon="icon" />
        </div>
        <div class="select-menu">
            <div
                v-for="(opt, idx) in options"
                :key="opt + idx"
                class="select-option"
                @click="handleOptionClick(opt)"
            >
                {{ opt }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import MaterialDesignIcon from "./MaterialDesignIcon.vue";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";

interface Props {
    options: string[];
    selected: string;
}

interface Methods {
    handleCloseOnWindowClick(): void;
}

interface Data {
    dropdownOpen: boolean;
}

export default Vue.extend<Data, Methods, {}, Props>({
    name: "DropDownUnitSelector",
    components: {
        MaterialDesignIcon
    },
    model: {
        prop: "selected",
        event: "change"
    },
    props: {
        options: {
            type: Array,
            required: true
        },
        selected: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            dropdownOpen: false
        };
    },
    computed: {
        icon() {
            if (this.dropdownOpen) return mdiChevronUp;
            else return mdiChevronDown;
        }
    },
    created() {
        window.addEventListener("click", this.handleCloseOnWindowClick);
    },
    beforeDestroy() {
        window.removeEventListener("click", this.handleCloseOnWindowClick);
    },
    methods: {
        toggle() {
            this.dropdownOpen = !this.dropdownOpen;
        },
        handleOptionClick(option: string) {
            this.$emit("change", option);
            this.dropdownOpen = false;
        },
        handleCloseOnWindowClick() {
            this.dropdownOpen = false;
        }
    }
});
</script>

<style lang="postcss" scoped>
.select {
    position: relative;
    user-select: none;
}

.select-value-container {
    align-items: center;
    background-color: white;
    border: 1px solid white;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    height: 49px;
    padding: 0 15px;
    transition: border-color 225ms ease, border-radius 225ms ease;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.select.is-open .select-value-container {
    border-color: var(--color-melbourne-cup);
    border-radius: 4px 4px 0 0;
}

.select-value {
    color: var(--color-washed-black);
    flex-grow: 1;
    font-size: 14px;
    text-transform: capitalize;
}

.icon {
    color: var(--color-international);
    width: 18px;
}

.select-menu {
    background: white;
    border: 1px solid var(--color-melbourne-cup);
    border-radius: 0 0 4px 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    inset-block-start: 48px;
    inset-inline: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    transition: opacity 225ms ease;
    z-index: 1;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.select.is-open .select-menu {
    opacity: 1;
    pointer-events: all;
}

.select-option {
    cursor: pointer;
    font-size: 14px;
    padding: 10px 15px;
    text-transform: capitalize;

    &:hover,
    &:focus {
        background-color: var(--color-jupiter);
    }
}
</style>
