<template>
    <div>
        <button @click="sendInfo">Info</button>
        <button @click="sendWarn">Warn</button>
        <button @click="sendError">Error</button>
        <button @click="sendSuccess">Success</button>
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
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { computed, value } from "vue-function-api";
import store from "@/store";
import Alert from "@/components/Alert.vue";
import { ALERT } from "@/store/actions";

export default Vue.extend({
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

        function createAlert(message: string, level: string) {
            return {
                message,
                level
            };
        }

        function sendAlert(level: string) {
            store.dispatch(
                ALERT,
                createAlert(
                    "This is a message that is long enough to be long.",
                    level
                )
            );
        }

        function sendInfo() {
            sendAlert("info");
        }

        function sendWarn() {
            sendAlert("warn");
        }

        function sendError() {
            sendAlert("error");
        }

        function sendSuccess() {
            sendAlert("success");
        }

        return {
            alerts,
            sendInfo,
            sendWarn,
            sendError,
            sendSuccess
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
