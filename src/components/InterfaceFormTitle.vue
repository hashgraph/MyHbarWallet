<template>
    <div class="interface-form-title-container">
        <div class="interface-form-title">{{ title }}</div>
        <Button label="Menu" @click="emitMenuOpen" />
    </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";
import Button from "../components/Button.vue";
import store from "../store";
import { SET_INTERFACE_MENU_IS_OPEN } from "../store/mutations";

export default createComponent({
    props: {
        title: { type: String, required: true }
    },
    components: {
        Button
    },
    setup() {
        function emitMenuOpen() {
            store.commit(SET_INTERFACE_MENU_IS_OPEN, true);
        }
        return { emitMenuOpen };
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
    border-radius: 30px;
    font-size: 12px;
    inset-inline-end: 10px;
    min-width: 10px;
    padding: 8px 12px;

    @media (min-width: 1259px) {
        display: none;
    }
}

.interface-form-title {
    border-left: 5px solid var(--color-melbourne-cup);
    font-size: 24px;
    font-weight: 500;
    padding-inline-start: 27px;
}
</style>
