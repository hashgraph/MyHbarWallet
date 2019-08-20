<template>
    <div class="read-only-input">
        <div class="value">{{ value }}</div>
    </div>
</template>

<script lang="ts">
import { createComponent } from "vue-function-api";
import { PropType } from "vue";

export default createComponent({
    props: {
        value: (String as unknown) as PropType<string>
    },
    setup() {}
});
</script>

<style scoped lang="postcss">
.value {
    background-color: var(--color-peral);
    border: 2px solid var(--color-peral);
    border-radius: 4px;
    color: var(--color-basalt-grey);
    overflow: hidden;
    padding: 13px 15px;
    white-space: nowrap;
}
</style>
