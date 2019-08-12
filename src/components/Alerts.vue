<template>
    <div>
        <button @click="sendInfo">Info</button>
        <button @click="sendWarn">Warn</button>
        <button @click="sendError">Error</button>
        <button @click="sendSuccess">Success</button>
        <div class="alerts">
            <transition-group name="list" tag="div">
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
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { computed, value } from "vue-function-api";
import store from "@/store";
import Alert from "@/components/Alert.vue";
import { ALERT } from "@/mutations";

export default Vue.extend({
    components: {
        Alert
    },
    props: {
        timeout: { type: String, required: true }
    },
    setup() {
        const alerts = computed(() => {
            return store.state.alerts;
        });

        const id = value(0);

        const createAlert = (message: string, level: string) => {
            return {
                id: id.value++,
                message,
                level
            };
        };

        const sendAlert = (level: string) => {
            store.commit(ALERT, createAlert("Message", level));
        };

        const sendInfo = () => {
            sendAlert("info");
        };

        const sendWarn = () => {
            sendAlert("warn");
        };

        const sendError = () => {
            sendAlert("error");
        };

        const sendSuccess = () => {
            sendAlert("success");
        };

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
    inset-block-end: 7%;
    inset-inline-end: 5%;
    max-height: 425px;
    overflow: hidden;
    position: fixed;
    width: 325px;
    z-index: 9001;
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
    transform: translateY(35px);
}
</style>
