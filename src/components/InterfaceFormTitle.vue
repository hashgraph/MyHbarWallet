<template>
    <div class="interface-form-title-container">
        <div class="interface-form-title">
            {{ title }}
        </div>
        <Button
            :label="$t('common.menu')"
            @click="emitMenuOpen"
        />
    </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";
import Button from "../components/Button.vue";
import { mutations } from "../store";

function emitMenuOpen(): void {
    mutations.SET_INTERFACE_MENU_IS_OPEN(true);
}

export default createComponent({
    props: { title: { type: String, required: true }},
    components: { Button },
    setup() {
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
