<template>
    <div class="read-only-input">
        <div :class="{ value: !multiline }">{{ value }}</div>
    </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";
import { PropType } from "vue";

export default createComponent({
    props: {
        value: (String as unknown) as PropType<string>,
        multiline: (Boolean as unknown) as PropType<boolean>
    }
});
</script>

<style scoped lang="postcss">
.read-only-input {
    background-color: var(--color-peral);
    border: 2px solid var(--color-peral);
    border-radius: 4px;
    color: var(--color-washed-black);
    font-family: monospace;
    font-size: 14px;
    padding: 13px 15px;
    width: 100%;
}

.value {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
