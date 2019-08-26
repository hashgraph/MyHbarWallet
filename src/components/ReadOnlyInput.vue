<template>
    <div class="read-only-input">
        <div class="value">{{ value }}</div>
    </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";
import { PropType } from "vue";

export default createComponent({
    props: {
        value: (String as unknown) as PropType<string>
    }
});
</script>

<style scoped lang="postcss">
.read-only-input {
    background-color: var(--color-peral);
    border: 2px solid var(--color-peral);
    border-radius: 4px;
    color: var(--color-washed-black);
    overflow: hidden;
    padding: 13px 15px;
    width: 100%;
}

.value {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
