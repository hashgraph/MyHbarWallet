<template>
    <div class="transaction-link">
        <a
            :href="link"
            target="_blank"
        ><slot>View on Kabuto</slot></a>
        &nbsp;
        <MaterialDesignIcon
            size="18"
            :icon="mdiOpenInNew"
        />
    </div>
</template>
<script lang="ts">
import { createComponent, computed } from "@vue/composition-api";
import Button from "../components/Button.vue";
import MaterialDesignIcon from "../components/MaterialDesignIcon.vue";
import { getters } from "../store";
import { mdiOpenInNew } from "@mdi/js";

export default createComponent({
    props: { id: String },
    components: { Button, MaterialDesignIcon },
    setup(props) {
        const link = computed(() => {
            const network = getters.GET_NETWORK();
            const netName = network.name.replace("network.", "");
            if (props.id != null) {
                return `https://explorer.kabuto.sh/${netName}/search?q=${props.id}`;
            }
            return "";
        });

        return { link, mdiOpenInNew };
    }
});
</script>
<style scoped lang="postcss">
.transaction-link {
    & :first-child {
        color: var(--color-california-orange);
    }
}
</style>
