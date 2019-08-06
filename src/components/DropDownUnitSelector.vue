<template>
    <div class="dropdown-unit-selector">
        <div class="unit-selector-click-safe-zone">
            <div
                :class="dropdownOpen ? 'dropdown-open' : ''"
                class="dropdown-input-box"
                @click="toggle"
            >
                <div class="selected-unit">{{ currentSelected }}</div>
                <div class="dropdown-open-button">
                    <FontAwesomeIcon class="icon" :icon="icon" :name="icon" />
                </div>
            </div>
            <div
                :class="dropdownOpen ? 'show-dropdown' : ''"
                class="dropdown-list-box"
            >
                <ul>
                    <li
                        v-for="(opt, idx) in options"
                        :key="opt + idx"
                        @click="selected(opt)"
                    >
                        {{ opt }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default Vue.extend({
    name: "DropDownUnitSelector",
    components: {
        FontAwesomeIcon
    },
    props: {
        options: {
            type: Array,
            default: function() {
                return [];
            }
        },
        currentSelected: {
            type: String,
            default: ""
        },
        left: {
            type: Boolean
        }
    },
    data() {
        return {
            dropdownOpen: false
        };
    },
    computed: {
        icon() {
            if (this.dropdownOpen) return faChevronUp;
            else return faChevronDown;
        },
        side(): any {
            return this.left;
        }
    },
    beforeMount() {
        document.addEventListener("click", this.clickEvent, false);
    },
    beforeDestroy() {
        document.removeEventListener("click", this.clickEvent, false);
    },
    methods: {
        clickEvent: function(event: any) {
            const path =
                event.path ||
                (event.composedPath && event.composedPath()) ||
                this.composedPath(event.target);
            for (let count = 0; count < path.length; count++) {
                if (path[count].className === "unit-selector-click-safe-zone") {
                    return;
                }
            }
            this.dropdownOpen = false;
        },
        composedPath(el: any) {
            const path = [];

            while (el) {
                path.push(el);
                if (el.tagname === "HTML") {
                    path.push(document);
                    path.push(window);
                    return path;
                }
                el = el.parentElement;
            }
        },
        toggle() {
            return (this.dropdownOpen = !this.dropdownOpen);
        },
        selected(val: any) {
            this.dropdownOpen = false;
            this.$emit("updatedSelected", [val, this.side ? "left" : "right"]);
        }
    }
});
</script>

<style lang="postcss" scoped>
.dropdown-unit-selector {
    position: relative;
    user-select: none;
}

.form-tile-container {
    margin-block-end: 10px;
    padding: 0 10px;
}

.title {
    color: var(--color-washed-black);
    font-size: 16px;
    font-weight: 600;
    line-height: initial;
}

.unit-selector-click-safe-zone {
    position: relative;
}

@media screen and (prefers-reduced-motion: reduce) {
    .dropdown-input-box {
        background-color: var(--color-white);
        border: 1px solid var(--color-white);
        border-radius: 4px;
        cursor: pointer;
        height: 57px;
        position: relative;
        transition: none;

        &.dropdown-open {
            background-color: var(--color-white);
            border-bottom: 1px solid var(--color-peral);
            border-radius: 4px 4px 0 0;
        }
    }
}

.dropdown-input-box {
    background-color: var(--color-white);
    border: 1px solid var(--color-peral);
    border-radius: 4px;
    cursor: pointer;
    height: 57px;
    position: relative;

    &.dropdown-open {
        background-color: var(--color-white);
        border: 1px solid var(--color-peral);
        border-radius: 4px 4px 0 0;
    }
}

.selected-unit {
    padding: 18px;
    padding-inline-end: 70px;
}

span {
    color: var(--color-green-jelly);
    font-size: 12px;
    margin-inline-start: 5px;
}

.dropdown-open-button {
    display: flex;
    height: 100%;
    inset-block-start: 23px;
    inset-inline-end: 8px;
    justify-content: center;
    position: absolute;
    user-select: none;

    &.icon {
        align-content: center;
        color: #3766aa;
        font-size: 9px;
        margin-block-start: 12px;
        padding: 10px 22px;
    }
}

@media screen and (prefers-reduced-motion: reduce) {
    .dropdown-list-box {
        background-color: var(--color-peral);
        border: 1px solid #adadad;
        border-radius: 0 0 4px 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
        max-height: 230px;
        opacity: 0;
        overflow-x: hidden;
        overflow-y: auto;
        pointer-events: none;
        position: absolute;
        transition: none;
        user-select: none;
        width: 100%;
        z-index: 2;
    }
}

.dropdown-list-box {
    background-color: var(--color-peral);
    border: 1px solid #adadad;
    border-radius: 0 0 4px 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    max-height: 230px;
    opacity: 0;
    overflow-x: hidden;
    overflow-y: auto;
    pointer-events: none;
    position: absolute;
    user-select: none;
    width: 100%;
    z-index: 2;
}

.show-dropdown {
    background-color: var(--color-white);
    opacity: 1;
    pointer-events: initial;
}

.search-block {
    padding: 10px;
    position: relative;
}

input {
    background-color: var(--color-peral);
    border: 0;
    border-radius: 5px;
    padding: 10px;
    padding-inline-start: 40px;
    width: 100%;
}

img {
    position: absolute;
}

ul {
    margin: 0;
    padding-inline-start: 0;
}

li {
    align-items: center;
    cursor: pointer;
    display: flex;
    padding: 10px 15px;
    position: relative;

    &:hover,
    &:focus {
        background-color: #e0e0e0;
    }
}

li > span {
    color: var(--color-green-jelly);
    font-size: 12px;
    margin-inline-end: 5px;
}
</style>
