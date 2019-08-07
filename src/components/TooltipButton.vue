<template>
    <div class="tooltip-button">
        <button
            v-tooltip
            :title="message"
            type="button"
            @mouseenter="hovered"
            @mouseleave="unhovered"
            @click.stop
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
            hover: false
        };
    },
    computed: {
        image() {
            if (this.hover) {
                return exclamationActive;
            } else {
                return exclamation;
            }
        }
    },
    methods: {
        hovered() {
            this.hover = true;
        },
        unhovered() {
            this.hover = false;
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
