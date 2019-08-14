<template>
    <svg :data-jdenticon-value="value"></svg>
</template>

<script lang="ts">
import { createComponent, computed, PropType } from "vue-function-api";
import jdenticon from "jdenticon";

interface Props {
    size: number;
    value: string;
}

export default createComponent({
    props: {
        size: (Number as unknown) as PropType<number>,
        value: (String as unknown) as PropType<string>
    },
    setup(props: Props) {
        const value = computed(() => jdenticon.toSvg(props.value, props.size));

        return {
            value
        };
    }
});
</script>
