<template>
    <div class="tooltip-button">
        <button
            v-tooltip
            :title="message"
            type="button"
            @mouseenter="hovered"
            @mouseleave="unhovered"
            @click.stop="clicked"
        >
            <img :src="image" alt="(i)" />
        </button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import exclamation from "@/assets/exclamation.svg";
import exclamationActive from "@/assets/exclamation-active.svg";

export default Vue.extend({
    name: "TooltipButton",
    props: {
        message: { type: String, required: true, default: "" }
    },
    data: function() {
        return {
            hover: false,
            click: false
        };
    },
    computed: {
        active() {
            return this.click || this.hover;
        },
        image() {
            if (this.hover) {
                // not this.active
                return exclamationActive;
            } else {
                return exclamation;
            }
        }
    },
    watch: {
        active: function() {
            console.log("Active: " + this.active);
        }
    },
    created: function() {
        window.addEventListener("click", this.unclicked);
    },
    destroyed: function() {
        window.removeEventListener("click", this.unclicked);
    },
    methods: {
        hovered() {
            this.hover = true;
        },
        unhovered() {
            this.hover = false;
        },
        clicked() {
            this.click = !this.click;
        },
        unclicked() {
            this.click = false;
        }
    }
});
</script>

<style lang="postcss" scoped>
button {
    border: none;
    cursor: pointer;
    outline: none;
}
</style>
