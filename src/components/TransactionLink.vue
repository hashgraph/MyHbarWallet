<template>
    <a
        class="transaction-link"
        :href="link"
        target="_blank"
    ><slot>View on Kabuto</slot></a>
</template>
<script lang="ts">
import { createComponent, computed } from "@vue/composition-api";
import Button from "../components/Button.vue";
import { getters } from "../store";

export default createComponent({
    props: { id: String },
    components: { Button },
    setup(props) {
        const link = computed(() => {
            const network = getters.GET_NETWORK();
            const netName = network.name.replace("network.", "");
            if (props.id != null) {
                return `https://explorer.kabuto.sh/${netName}/search?q=${props.id}`;
            }
            return "";
        });

        return { link };
    }
});
</script>
<style scoped lang="postcss">
.transaction-link {
    color: var(--color-california-orange);
}
</style>
