<template>
    <transition-group name="list" tag="div" class="alerts">
        <Alert
            v-for="alert in alerts"
            :id="alert.id"
            :key="alert.id"
            :message="alert.message"
            :level="alert.level"
            :timeout="alert.timeout"
        />
    </transition-group>
</template>

<script lang="ts">
import store from "@/store";
import Alert from "@/components/Alert.vue";
import { createComponent, computed } from "vue-function-api";

export default createComponent({
    components: {
        Alert
    },
    props: {
        timeout: { type: String, required: true }
    },
    setup() {
        const alerts = computed(() => {
            return store.state.alerts.queue;
        });

        return {
            alerts
        };
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
    width: 325px;
    z-index: 5;
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
