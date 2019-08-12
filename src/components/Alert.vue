<template>
    <div :class="['alert', level]">
        <div class="message">
            <MaterialDesignIcon class="message-icon" :icon="messageIcon" />
            {{ message }}
        </div>
        <MaterialDesignIcon
            role="button"
            class="close"
            :icon="mdiClose"
            @click="destroyMe"
        />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { computed } from "vue-function-api";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import {
    mdiClose,
    mdiCloseCircleOutline,
    mdiInformationOutline,
    mdiAlertOutline,
    mdiCheckCircleOutline
} from "@mdi/js";
import { REMOVE_ALERT } from "@/store/mutations";
import store from "@/store";

export default Vue.extend({
    components: {
        MaterialDesignIcon
    },
    props: {
        id: { type: Number, required: true },
        message: { type: String, required: true },
        level: { type: String, required: false, default: "info" }
    },
    setup(props) {
        const messageIcon = computed(() => {
            if (props.level === "info") {
                return mdiInformationOutline;
            } else if (props.level === "warn") {
                return mdiAlertOutline;
            } else if (props.level === "error") {
                return mdiCloseCircleOutline;
            } else if (props.level === "success") {
                return mdiCheckCircleOutline;
            } else {
                return mdiAlertOutline;
            }
        });

        const destroyMe = () => {
            store.commit(REMOVE_ALERT, props.id);
        };

        return {
            messageIcon,
            mdiClose,
            destroyMe
        };
    }
});
</script>

<style lang="postcss" scoped>
.alert {
    align-items: center;
    background-color: var(--color-black);
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    color: var(--color-white);
    display: flex;
    font-size: 15px;
    font-weight: 300;
    justify-content: space-between;
    margin-block-start: 10px;
    min-height: 75px;
    overflow: hidden;
    padding: 6px 20px;
    user-select: none;
    width: 325px;
}

.close {
    cursor: pointer;
    display: flex;
    flex-shrink: 0;
    justify-content: center;
}

.message {
    align-items: center;
    display: flex;
}

.message-icon {
    flex-shrink: 0;
    margin-inline-end: 10px;
}

.error {
    background-color: var(--color-sunkist-coral);
}

.warn {
    background-color: var(--color-california-orange);
}

.info {
    background-color: var(--color-boston-blue);
}

.success {
    background-color: var(--color-fruit-salad);
}
</style>
