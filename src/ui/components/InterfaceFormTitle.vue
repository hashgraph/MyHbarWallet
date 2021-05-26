<template>
    <div class="interface-form-title-container">
        <div class="interface-form-title">
            {{ title }}
            <div class="interface-form-description">
                {{ description }}
            </div>
        </div>
        <Button
            :label="$t('common.menu')"
            @click="emitMenuOpen"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

import { mutations } from "../store";

import Button from "./Button.vue";

function emitMenuOpen(): void {
    mutations.setInterfaceMenuIsOpen(true);
}

export default defineComponent({
    name: "InterfaceFormTitle",
    props: {
        title: { type: String, required: true },
        description: { type: String, required: false }
    },
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

.interface-form-description {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #BDBDBD;
}
</style>
