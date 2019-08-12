<template>
    <div :class="classes">
        <div class="message">
            <MaterialDesignIcon
                class="message-icon"
                :icon="messageIcon"
            />&nbsp;{{ message }}
        </div>
        <div class="close">
            <button @click="destroyMe">
                <MaterialDesignIcon class="close-icon" :icon="mdiClose" />
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { computed, onCreated } from "vue-function-api";
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import {
    mdiClose,
    mdiCloseCircleOutline,
    mdiInformationOutline,
    mdiAlertOutline,
    mdiCheckCircleOutline
} from "@mdi/js";
import { REMOVE_ALERT } from "@/mutations";
import store from "@/store";

export default Vue.extend({
    components: {
        MaterialDesignIcon
    },
    props: {
        id: { type: Number, required: true },
        message: { type: String, required: true },
        level: { type: String, required: false, default: "info" },
        timeout: { type: String, required: false, default: "5000" }
    },
    setup(props) {
        const classes = computed(() => {
            return "alert " + props.level;
        });

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

        onCreated(() => {
            setTimeout(destroyMe, Number(props.timeout));
        });

        return {
            classes,
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
    background-position: 15px center;
    background-repeat: no-repeat;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    clear: both;
    color: var(--color-white);
    display: flex;
    float: inline-end;
    font-size: 15px;
    font-weight: 300;
    inset-block-start: 35px;
    justify-content: space-between;
    line-height: 1.1em;
    margin: 10px 0 0 0;
    min-height: 75px;
    opacity: 1;
    overflow: hidden;
    padding: 6px 20px;
    position: relative;
    transform: translateY(-35px);
    user-select: none;
    width: 325px;
}

.close {
    display: flex;
    float: inline-end;
    font-size: 20px;
    font-weight: 600;
    justify-content: center;
    margin: 0;
    padding: 0;
    position: relative;
    text-decoration: none;
    text-shadow: 0 1px 0 var(--color-white);

    & button {
        background: transparent;
        border: none;
        margin: 0;
        outline: none;
        padding: 0;

        & :hover,
        & :focus,
        & :active {
            cursor: pointer;
        }
    }
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
