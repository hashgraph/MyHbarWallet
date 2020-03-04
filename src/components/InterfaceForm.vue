<template>
    <div class="interface-form">
        <InterfaceFormTitle :title="title" />
        <div class="interface-form-container">
            <div class="form-main">
                <slot />
            </div>
            <div class="form-footer">
                <slot name="footer" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import InterfaceFormTitle from "../components/InterfaceFormTitle.vue";

export default defineComponent({
    components: { InterfaceFormTitle },
    props: { title: { type: String, required: true }}
});
</script>

<style lang="postcss" scoped>
.interface-form {
    background-color: var(--color-white);
    border-radius: 4px;
}

.interface-form-container {
    padding: 40px;
}

.form-main {
    display: grid;
    grid-row-gap: 30px;
}

.form-footer {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-block-start: 40px;
}
</style>
