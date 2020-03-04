<template>
    <transition-group
        name="list"
        tag="div"
        class="alerts"
    >
        <Alert
            v-for="alert in alerts"
            :id="alert.id"
            :key="alert.id"
            :message="alert.message"
            :level="alert.level"
        />
    </transition-group>
</template>

<script lang="ts">
import Alert from "../components/Alert.vue";
import { defineComponent, computed } from "@vue/composition-api";
import { store } from "../store";

export default defineComponent({
    components: { Alert },
    props: {},
    setup() {
        const alerts = computed(() => store.state.alerts.queue);

        return { alerts };
    }
});
</script>

<style lang="postcss" scoped>
.alerts {
    display: flex;
    flex-direction: column;
    inset-block-end: 70px;
    inset-inline-end: 70px;
    max-height: 425px;
    overflow: hidden;
    position: fixed;
    width: 375px;
    z-index: 5;

    @media (max-width: 1024px) {
        inset-block-end: 20px;
        inset-inline-end: 20px;
        max-height: 300px;
        width: 200px;
    }

    @media (max-width: 425px) {
        inset-block-end: 10px;
        inset-inline-end: 0;
        max-height: 50px;
        width: calc(100% - 10px);
    }
}

.list-enter-active,
.list-leave-active {
    transition: all ease 0.3s;

    @media (prefers-reduced-motion) {
        transition: none;
    }
}

.list-enter,
.list-leave-to {
    opacity: 0;
}
</style>
