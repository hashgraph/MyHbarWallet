<template>
    <div class="interface-form-title-container">
        <div class="interface-form-title">{{ title }}</div>
        <Button label="Menu" @click="emitMenuToggle"></Button>
    </div>
</template>

<script lang="ts">
import { createComponent } from "vue-function-api";
import Button from "@/components/Button.vue";
import EventBus from "../event-bus";

export default createComponent({
    props: {
        title: { type: String, required: true }
    },
    components: {
        Button
    },
    setup() {
        function emitMenuToggle() {
            EventBus.$emit("toggle-menu");
        }
        return { emitMenuToggle };
    }
});
</script>

<style lang="postcss" scoped>
.interface-form-title-container {
    align-items: center;
    border-bottom: 2px solid var(--color-peral);
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-inline-end: 10px;
    padding: 15px 0;
}

button {
    @media (min-width: 1258px) {
        display: none;
    }

    @media (max-width: 1258px) {
        border-radius: 30px;
        font-size: 12px;
        min-width: 10px;
        padding: 8px 12px;
    }

    /* FIXME: remove max-width block below when there is more interface content */
    @media (max-width: 1020px) {
        position: fixed;
        inset-inline-end: 10px;
    }
}

.interface-form-title {
    border-left: 5px solid var(--color-melbourne-cup);
    font-size: 24px;
    font-weight: 500;
    padding-inline-start: 27px;
}
</style>
